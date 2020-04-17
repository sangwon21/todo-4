//
//  BoardViewController.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/06.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import UIKit

class BoardViewController: UIViewController {

    @IBOutlet weak var boardStackView: UIStackView!
    
    private var listViewControllers = [Int: CardListUpdater]()
    private var networkManager: NetworkManager?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        configureSession()
        
        requestBoard()
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "ShowActivities",
            let destinationVC = segue.destination as? ActivitiesViewController {
            destinationVC.networkManager = networkManager
        }
    }
    
    private func configureSession() {
        networkManager = NetworkManager(session: URLSession(configuration: .default))
    }
    
    private func setupLists(with listIDs: [Int]) {
        listViewControllers = listIDs.reduce(into: [:]) { [unowned self] viewControllers, listID in
            guard let vc = UILoader.load(viewControllerType: CardListViewController.self,
                                         from: storyboard) else { return }
            vc.listID = listID
            vc.tableViewDataSource = CardListDataSource()
            vc.tableViewDelegate = CardListDelegate()
            vc.networkManager = networkManager
            vc.delegate = self
            self.boardStackView.addArrangedSubview(vc.view)
            viewControllers[listID] = vc
        }
    }
    
    private func setupBoard(with board: Board) {
        let listPackage = board.listPackage
        setupLists(with: listPackage.keys.sorted())
        listPackage.forEach { id, list in
            listViewControllers[id]?.update(list: list)
        }
    }
}

extension BoardViewController {
    private func requestBoard() {
        networkManager?.requestBoard { [weak self] result in
            switch result {
            case .failure: return
            case let .success(board):
                DispatchQueue.main.async {
                    self?.setupBoard(with: board)
                }
            }
        }
    }
    
    private func requestNewCard(listID id: Int, card: Card) {
        var card = card
        networkManager?.requestNewCard(listID: id, card: card) { [weak self] result in
            switch result {
            case .failure: return
            case let .success(response):
                card.id = response.cardID
                self?.listViewControllers[id]?.insert(cards: [card])
            }
        }
    }
}

extension BoardViewController: CardListViewControllerDelegate {
    func addNewCardDidTouch(viewController: CardListViewController) {
        guard let vc = UILoader.load(viewControllerType: FormViewController.self, from: storyboard) else { return }
        vc.listID = viewController.listID
        vc.delegate = self
        present(vc, animated: true)
    }
    
    func deleteCards(viewController: CardListViewController, cards: [FloatingCard]) -> Bool {
        var cardsToDelete = [Int: [Int]]()
        (0..<listViewControllers.count).forEach { number in
            cardsToDelete[number] = cards
                .filter { $0.sourceListID == number }
                .map { $0.sourceIndex }
                .sorted()
        }
        cardsToDelete.forEach { [weak self] listID, indices in
            self?.listViewControllers[listID]?.delete(cardsAt: indices)
        }
        return true
    }
}

extension BoardViewController: FormViewControllerDelegate {
    func newCardDidSubmit(viewController: FormViewController, card: Card) {
        guard let id = viewController.listID else { return }
        requestNewCard(listID: id, card: card)
    }
}

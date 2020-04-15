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
        
        setupTodoLists(for: 3)
        
        requestBoard()
    }
    
    private func configureSession() {
        let config = URLSessionConfiguration.ephemeral
        config.protocolClasses = [URLProtocolMock.self]
        networkManager = NetworkManager(session: URLSession(configuration: config))
    }
    
    private func setupTodoLists(for number: Int) {
        listViewControllers = (0..<number).reduce(into: [:]) { [unowned self] viewControllers, number in
            guard let vc = UILoader.load(viewControllerType: CardListViewController.self,
                                         from: storyboard) else { return }
            vc.listID = number
            vc.tableViewDataSource = CardListDataSource()
            vc.tableViewDelegate = CardListDelegate()
            vc.delegate = self
            self.boardStackView.addArrangedSubview(vc.view)
            viewControllers[number] = vc
        }
    }
}

extension BoardViewController {
    private func requestBoard() {
        networkManager?.requestBoard { result in
            switch result {
            case .failure: return
            case let .success(board):
                let listPackage = board.listPackage
                (0..<listPackage.count).forEach { [weak self] in
                    self?.listViewControllers[$0]?.update(list: listPackage[$0] ?? List(with: 0))
                }
            }
        }
    }
    
    private func requestNewCard(listID id: Int, card: Card) {
        var card = card
        networkManager?.requestNewCard(card: card) { [weak self] result in
            switch result {
            case .failure: return
            case let .success(response):
                card.id = response.cardID
                self?.listViewControllers[id]?.insert(card: card)
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
    
    func deleteCardDidInvoke(viewController: CardListViewController, card: Card) {
        
    }
}

extension BoardViewController: FormViewControllerDelegate {
    func newCardDidSubmit(viewController: FormViewController, card: Card) {
        guard let id = viewController.listID else { return }
        requestNewCard(listID: id, card: card)
    }
}

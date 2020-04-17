//
//  CardListViewController.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/07.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import UIKit

protocol CardListViewControllerDelegate: class {
    func addNewCardDidTouch(viewController: CardListViewController)
    func deleteCards(viewController: CardListViewController, cards: [FloatingCard]) -> Bool
}

protocol CardListUpdater {
    func update(list: List)
    func insert(cards: [Card], at row: Int?)
    func delete(cardsAt rows: [Int])
}

extension CardListUpdater {
    func insert(cards: [Card], at row: Int? = nil) {
        insert(cards: cards, at: row)
    }
}

class CardListViewController: UIViewController {

    @IBOutlet weak var cardCountLabel: UILabel!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var tableView: UITableView!
    
    var viewModel: CardListViewModel?
    var tableViewDataSource: CardListDataSource?
    var tableViewDelegate: CardListDelegate?
    var networkManager: NetworkManager?
    var listID: Int?
    
    weak var delegate: CardListViewControllerDelegate?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setupDataSource()
        
        setupDelegates()
        
        tableView.dragInteractionEnabled = true
    }
    
    private func updateList(with listChange: ListChangeDetails?) {
        if let deletedRows = listChange?.deletedRows {
            let indexPaths = deletedRows.map { IndexPath(row: $0, section: 0) }
            tableView.deleteRows(at: indexPaths, with: .automatic)
        } else if let insertedRows = listChange?.insertedRows {
            let indexPaths = insertedRows.map { IndexPath(row: $0, section: 0) }
            tableView.insertRows(at: indexPaths, with: .automatic)
        } else {
            titleLabel.text = listChange?.list.title
            tableView.reloadData()
        }
        cardCountLabel.text = "\(listChange?.list.count ?? 0)"
    }
    
    private func setupDataSource() {
        tableViewDataSource?.rowCount = { [weak self] in
            return self?.viewModel?.cardCount ?? 0
        }
        tableViewDataSource?.cardAtRow = { [weak self] in
            return self?.viewModel?.card(at: $0) ?? Card()
        }
        tableViewDataSource?.moveCard = { [weak self] source, destination in
            self?.viewModel?.move(at: source, to: destination)
        }
        tableView.dataSource = tableViewDataSource
    }
    
    private func setupDelegates() {
        tableViewDelegate?.deleteAction = { [weak self] in
            guard let self = self, let card = self.viewModel?.card(at: $0) else { return }
            self.requestDelete(card: card, cardIndex: $0)
        }
        tableViewDelegate?.dragItem = { [weak self] in
            guard let self = self, let card = self.viewModel?.card(at: $0) else { return nil }
            return Drag.item(from: FloatingCard(sourceListID: self.listID, sourceIndex: $0, card: card))
        }
        tableViewDelegate?.dropItem = { [weak self] coordinator, index in
            guard let self = self else { return }
            let cards = Drop.objects(from: coordinator) as [FloatingCard]
            if let result = self.delegate?.deleteCards(viewController: self, cards: cards), result {
                self.viewModel?.insert(cards: cards.map { $0.card }, at: index)
            }
        }
        tableView.delegate = tableViewDelegate
        tableView.dragDelegate = tableViewDelegate
        tableView.dropDelegate = tableViewDelegate
    }
    
    @IBAction func addNewCard(_ sender: Any) {
        delegate?.addNewCardDidTouch(viewController: self)
    }
}

extension CardListViewController: CardListUpdater {
    func update(list: List) {
        viewModel = CardListViewModel(with: ListChangeDetails(with: list)) { [weak self] listChange in
            DispatchQueue.main.async { self?.updateList(with: listChange) }
        }
    }
    
    func insert(cards: [Card], at row: Int?) {
        viewModel?.insert(cards: cards, at: row)
    }
    
    func delete(cardsAt rows: [Int]) {
        guard rows.count > 0 else { return }
        viewModel?.remove(cardsAt: rows)
    }
}

extension CardListViewController {
    private func requestDelete(card: Card, cardIndex: Int) {
        guard let id = listID else { return }
        networkManager?.requestDelete(listID: id, card: card) { [weak self] result in
            switch result {
            case .failure: return
            case .success: self?.viewModel?.remove(cardsAt: [cardIndex])
            }
        }
    }
}

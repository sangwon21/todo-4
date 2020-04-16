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
}

protocol CardListUpdater {
    func update(list: List)
    func insert(card: Card, at row: Int)
}

extension CardListUpdater {
    func insert(card: Card, at row: Int = 0) {
        insert(card: card, at: row)
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
        if let deletedRow = listChange?.deletedRow {
            let indexPath = IndexPath(row: deletedRow, section: 0)
            tableView.deleteRows(at: [indexPath], with: .left)
        } else if let insertedRow = listChange?.insertedRow {
            let indexPath = IndexPath(row: insertedRow, section: 0)
            tableView.insertRows(at: [indexPath], with: .automatic)
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
        tableView.dataSource = tableViewDataSource
    }
    
    private func setupDelegates() {
        tableViewDelegate?.deleteAction = { [weak self] in
            guard let self = self, let card = self.viewModel?.card(at: $0) else { return }
            self.requestDelete(card: card, cardIndex: $0)
        }
        tableViewDelegate?.dragItem = { [weak self] in
            guard let card = self?.viewModel?.card(at: $0) else { return nil }
            return Drag.item(from: card)
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
    
    func insert(card: Card, at row: Int) {
        viewModel?.insert(card: card, at: row)
    }
}

extension CardListViewController {
    private func requestDelete(card: Card, cardIndex: Int) {
        networkManager?.requestDelete(card: card) { [weak self] result in
            switch result {
            case .failure: return
            case .success: self?.viewModel?.remove(at: cardIndex)
            }
        }
    }
}

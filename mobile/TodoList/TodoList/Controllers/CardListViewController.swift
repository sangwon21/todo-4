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
    func insert(card: Card)
}

class CardListViewController: UIViewController {

    @IBOutlet weak var cardCountLabel: UILabel!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var tableView: UITableView!
    
    var viewModel: CardListViewModel?
    var tableViewDataSource: CardListDataSource?
    var tableViewDelegate: CardListDelegate?
    var listID: Int?
    
    weak var delegate: CardListViewControllerDelegate?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setupDataSource()
        
        setupDelegate()
    }
    
    private func updateList(with listChange: ListChangeDetails?) {
        if let insertedRow = listChange?.insertedRow {
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
    
    private func setupDelegate() {
        tableView.delegate = tableViewDelegate
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
    
    func insert(card: Card) {
        viewModel?.insert(card: card)
    }
}

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

class CardListViewController: UIViewController {

    @IBOutlet weak var cardCountLabel: UILabel!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var tableView: UITableView!
    
    private let observers = Observers()
    
    var viewModel: CardListViewModel?
    var dataSource: CardListDataSource?
    var listID: Int?
    
    weak var delegate: CardListViewControllerDelegate?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        addViewUpdatingObservers()
        
        setupDataSource()
    }
    
    deinit {
        observers.removeObservers()
    }
    
    func update(list: List) {
        viewModel = CardListViewModel(with: ListChangeDetails(with: list)) { [weak self] listChange in
            DispatchQueue.main.async { self?.updateList(with: listChange) }
        }
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
    
    private func addViewUpdatingObservers() {
        let observer = Card.addCardObserver(forName: .newCardDidUpdate, listID: listID) { [weak self] in
            self?.viewModel?.insert(card: $0)
        }
        observers.addObserver(observer)
    }
    
    private func setupDataSource() {
        dataSource?.rowCount = { [weak self] in
            return self?.viewModel?.cardCount ?? 0
        }
        dataSource?.cardAtRow = { [weak self] in
            return self?.viewModel?.card(at: $0) ?? Card()
        }
        tableView.dataSource = dataSource
    }
    
    @IBAction func addNewCard(_ sender: Any) {
        delegate?.addNewCardDidTouch(viewController: self)
    }
}

private extension Card {
    static func addCardObserver(forName name: NSNotification.Name,
                                listID id: Int?,
                                using block: @escaping (Card) -> Void) -> NSObjectProtocol {
        return NotificationCenter.default.addObserver(forName: name, object: nil, queue: .main) {
            if let card = $0.userInfo?[id] as? Card { block(card) }
        }
    }
}

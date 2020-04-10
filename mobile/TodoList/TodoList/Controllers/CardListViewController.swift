//
//  CardListViewController.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/07.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import UIKit

protocol CardListViewControllerDelegate: class {
    func addNewCardDidTouch(listID: Int?)
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
        
        setupViewModel()
        
        setupDataSource()
    }
    
    deinit {
        observers.removeObservers()
    }
    
    private func addViewUpdatingObservers() {
        let listObserver = List.addListObserver(forName: .boardDidUpdate, listID: listID) { [weak self] in
            self?.viewModel?.update(list: $0)
        }
        observers.addObserver(listObserver)
    }
    
    private func setupViewModel() {
        viewModel?.updateNotify { [weak self] list in
            self?.titleLabel.text = "\(list?.title ?? "")"
            self?.cardCountLabel.text = "\(list?.cards.count ?? 0)"
            self?.tableView.reloadData()
        }
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
        delegate?.addNewCardDidTouch(listID: listID)
    }
}

private extension List {
    static func addListObserver(forName name: NSNotification.Name,
                                listID id: Int?,
                                using block: @escaping (List) -> Void) -> NSObjectProtocol {
        return NotificationCenter.default.addObserver(forName: name, object: nil, queue: .main) {
            if let list = $0.userInfo?[id] as? List { block(list) }
        }
    }
}

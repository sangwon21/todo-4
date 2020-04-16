//
//  CardListDelegate.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/13.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import UIKit

class CardListDelegate: NSObject {
    
    private let deleteActionTitle = "삭제"
    
    var deleteAction: ((Int) -> Void)?
    
    var dragItem: ((Int) -> UIDragItem?)?
    
    var dropItem: ((UITableViewDropCoordinator, Int) -> Void)?
}

extension CardListDelegate: UITableViewDelegate {
    func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
        let deleteAction = UIContextualAction(style: .destructive,
                                              title: deleteActionTitle) { [weak self] _, _, completion in
            self?.deleteAction?(indexPath.row)
            completion(true)
        }
        return UISwipeActionsConfiguration(actions: [deleteAction])
    }
}

extension CardListDelegate: UITableViewDragDelegate {
    func tableView(_ tableView: UITableView, itemsForBeginning session: UIDragSession, at indexPath: IndexPath) -> [UIDragItem] {
        guard let dragItem = dragItem?(indexPath.row) else { return [] }
        return [dragItem]
    }
}

extension CardListDelegate: UITableViewDropDelegate {
    func tableView(_ tableView: UITableView, performDropWith coordinator: UITableViewDropCoordinator) {
        let destinationIndexPath: IndexPath
        if let indexPath = coordinator.destinationIndexPath {
            destinationIndexPath = indexPath
        } else {
            destinationIndexPath = IndexPath(row: tableView.numberOfRows(inSection: 0), section: 0)
        }
        dropItem?(coordinator, destinationIndexPath.row)
    }
}

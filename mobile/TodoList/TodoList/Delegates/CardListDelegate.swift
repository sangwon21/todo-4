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
        
    }
}

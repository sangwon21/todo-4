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

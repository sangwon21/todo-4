//
//  CardListDataSource.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/08.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import UIKit

class CardListDataSource: NSObject {
    
    var rowCount: (() -> Int)?
    
    var cardAtRow: ((Int) -> Card)?
    
    var moveCard: ((Int, Int) -> Void)?
}

extension CardListDataSource: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return rowCount?() ?? 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: CardCell.reuseIdentifier, for: indexPath) as? CardCell, let card = cardAtRow?(indexPath.row) else { return UITableViewCell() }
        cell.card = card
        return cell
    }
    
    func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        return true
    }
    
    func tableView(_ tableView: UITableView, moveRowAt sourceIndexPath: IndexPath, to destinationIndexPath: IndexPath) {
        moveCard?(sourceIndexPath.row, destinationIndexPath.row)
    }
}

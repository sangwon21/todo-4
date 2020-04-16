//
//  CardListViewModel.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/09.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import Foundation

protocol ViewModelBinding {
    associatedtype Key
    func updateNotify(handler: @escaping (Key) -> Void)
}

struct ListChangeDetails {
    let list: List
    let insertedRows: [Int]?
    let deletedRow: Int?
}

extension ListChangeDetails {
    init(with list: List, insertedRows: [Int]? = nil, deletedRow: Int? = nil) {
        self.list = list
        self.insertedRows = insertedRows
        self.deletedRow = deletedRow
    }
}

class CardListViewModel: ViewModelBinding {
    typealias Key = ListChangeDetails?
    
    private var listChangeDetails: Key = nil {
        didSet { changeHandler(listChangeDetails) }
    }
    
    private var changeHandler: (Key) -> Void
    
    var cardCount: Int {
        return listChangeDetails?.list.count ?? 0
    }
    
    init(with listChange: Key, handler: @escaping (Key) -> Void = { _ in }) {
        self.changeHandler = handler
        self.listChangeDetails = listChange
        changeHandler(listChange)
    }
    
    func updateNotify(handler: @escaping (Key) -> Void) {
        changeHandler = handler
    }
    
    func update(list: List) {
        listChangeDetails = ListChangeDetails(with: list)
    }
    
    func insert(cards: [Card], at row: Int) {
        guard var list = listChangeDetails?.list, cards.count > 0 else { return }
        list.insert(cards: cards, at: row)
        let rows = (row..<row + cards.count).map { $0 }
        listChangeDetails = ListChangeDetails(with: list, insertedRows: rows)
    }
    
    func remove(at row: Int) {
        guard var list = listChangeDetails?.list else { return }
        list.remove(at: row)
        listChangeDetails = ListChangeDetails(with: list, deletedRow: row)
    }
    
    func card(at row: Int) -> Card? {
        return listChangeDetails?.list[row]
    }
}

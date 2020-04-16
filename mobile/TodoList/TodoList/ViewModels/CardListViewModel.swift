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
    let insertedRow: Int?
    let deletedRow: Int?
}

extension ListChangeDetails {
    init(with list: List, insertedRow: Int? = nil, deletedRow: Int? = nil) {
        self.list = list
        self.insertedRow = insertedRow
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
    
    func insert(card: Card, at row: Int) {
        guard var list = listChangeDetails?.list else { return }
        list.insert(card: card)
        listChangeDetails = ListChangeDetails(with: list, insertedRow: row)
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

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
}

extension ListChangeDetails {
    init(with list: List) {
        self.list = list
        self.insertedRow = nil
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
    
    func insert(card: Card) {
        guard var list = listChangeDetails?.list else { return }
        list.insert(card: card)
        listChangeDetails = ListChangeDetails(list: list, insertedRow: 0)
    }
    
    func card(at row: Int) -> Card? {
        return listChangeDetails?.list[row]
    }
}

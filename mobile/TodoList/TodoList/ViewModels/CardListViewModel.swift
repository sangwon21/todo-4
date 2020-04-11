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

class CardListViewModel: ViewModelBinding {
    typealias Key = List?
    
    private var list: Key = nil {
        didSet { changeHandler(list) }
    }
    
    private var changeHandler: (Key) -> Void
    
    var cardCount: Int {
        return list?.cards.count ?? 0
    }
    
    init(with list: Key, handler: @escaping (Key) -> Void = { _ in }) {
        self.changeHandler = handler
        self.list = list
        changeHandler(list)
    }
    
    func update(list: Key) {
        self.list = list
    }
    
    func insert(card: Card) {
        list?.insert(card: card)
    }
    
    func updateNotify(handler: @escaping (Key) -> Void) {
        self.changeHandler = handler
    }
    
    func card(at row: Int) -> Card? {
        return list?.cards[row]
    }
}

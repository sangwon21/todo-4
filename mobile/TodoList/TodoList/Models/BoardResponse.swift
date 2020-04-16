//
//  BoardResponse.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/08.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import Foundation

struct BoardResponse: Decodable {
    let board: Board
}

struct Board: Decodable {
    let lists: [List]
}

struct List: Decodable {
    let title: String
    var cards: [Card]
}

struct Card: Codable, Equatable {
    var id: String
    let title, detail, author: String
}

extension Board {
    var listPackage: Dictionary<Int, List> {
        return lists.enumerated().reduce(into: [:]) { package, list in
            package[list.0] = list.1
        }
    }
}

extension List {
    var count: Int {
        return cards.count
    }
    
    init(with number: Int) {
        title = ""
        cards = (0..<number).map { _ in Card() }
    }
    
    mutating func insert(cards: [Card], at row: Int) {
        self.cards.insert(contentsOf: cards, at: row)
    }
    
    mutating func remove(at row: Int) {
        cards.remove(at: row)
    }
    
    subscript(index: Int) -> Card {
        get { return cards[index] }
    }
}

extension Card {
    init() {
        id = ""
        title = ""
        detail = ""
        author = ""
    }
}

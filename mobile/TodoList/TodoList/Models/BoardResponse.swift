//
//  BoardResponse.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/08.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import Foundation

typealias BoardResponse = [List]

struct Board: Decodable {
    let lists: [List]
}

struct List: Decodable {
    let id: Int
    let title: String
    var cards: [Card]
}

struct Card: Codable, Equatable {
    var id: Int
    let author: Author
    let title: String
    let detail: String?
    
    enum CodingKeys : String, CodingKey {
        case id, author, title
        case detail = "note"
    }
}

enum Author: String, Codable {
    case iOS = "iOS"
    case web = "nigayo"
}

extension Board {
    var listPackage: Dictionary<Int, List> {
        return lists.reduce(into: [:]) { package, list in
            package[list.id] = list
        }
    }
}

extension List {
    var count: Int {
        return cards.count
    }
    
    init(with number: Int) {
        id = 0
        title = ""
        cards = (0..<number).map { _ in Card() }
    }
    
    mutating func insert(cards: [Card], at row: Int) {
        self.cards.insert(contentsOf: cards, at: row)
    }
    
    mutating func remove(cardsAt rows: [Int]) {
        rows.reversed().forEach { cards.remove(at: $0) }
    }
    
    mutating func move(at sourceRow: Int, to destinationRow: Int) {
        guard sourceRow != destinationRow else { return }
        let card = cards[sourceRow]
        cards.remove(at: sourceRow)
        cards.insert(card, at: destinationRow)
    }
    
    subscript(index: Int) -> Card {
        get { return cards[index] }
    }
}

extension Card {
    init() {
        id = 0
        title = ""
        detail = ""
        author = .iOS
    }
}

extension Author: CustomStringConvertible {
    var description: String {
        switch self {
        case .iOS: return "iOS"
        case .web: return "Web"
        }
    }
}

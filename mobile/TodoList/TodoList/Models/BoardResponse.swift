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
    let cards: [Card]
}

struct Card: Decodable {
    let id, title, detail, author: String
}

extension Board {
    var listPackage: Dictionary<Int, List> {
        return lists.enumerated().reduce(into: [:]) { package, list in
            package[list.0] = list.1
        }
    }
}

//
//  CardRequest.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/17.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import Foundation

struct CardRequest: Encodable {
    let card: Card
    let history: History
}

extension CardRequest {
    init(card: Card) {
        self.card = card
        self.history = History(contents: "")
    }
}

struct History: Encodable {
    let contents: String
}

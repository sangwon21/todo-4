//
//  CardIDResponse.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/10.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import Foundation

struct CardIDResponse: Decodable {
    let cardID: Int
    
    enum CodingKeys : String, CodingKey {
        case cardID = "id"
    }
}

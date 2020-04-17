//
//  ActivitiesResponse.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/17.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import Foundation

typealias ActivitiesResponse = [Activity]

struct Activity: Decodable {
    let id: Int
    let action: String
    let description: String
    let suffix: String
    let time: String
    
    enum CodingKeys : String, CodingKey {
        case id, suffix
        case action = "userAction"
        case description = "contents"
        case time = "historyCreatedTime"
    }
}

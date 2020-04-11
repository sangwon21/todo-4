//
//  Endpoints.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/07.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import Foundation

class Endpoints {
    static let baseURL = "https://lucas.codesquad.kr"
    
    static let boardRequestURL = "\(baseURL)/columns"
    static let newCardRequestURL = "\(boardRequestURL)/columnId/cards"
}

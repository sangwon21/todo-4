//
//  APIRouter.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/07.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import Foundation

enum APIRouter {
    case board
    
    private var path: String {
        switch self {
        case .board: return Endpoints.boardRequestURL
        }
    }
    
    private var query: String {
        switch self {
        case .board: return ""
        }
    }
    
    var url: URL? {
        guard var urlComponents = URLComponents(string: path) else { return nil }
        urlComponents.query = query
        return urlComponents.url
    }
}

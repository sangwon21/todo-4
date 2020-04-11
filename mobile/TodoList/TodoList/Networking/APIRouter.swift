//
//  APIRouter.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/07.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import Foundation

enum APIRouter {
    
    enum HTTPMethod: String {
        case get = "GET"
        case post = "POST"
    }
    
    case board
    case newCard(card: Card)
    
    private var path: String {
        switch self {
        case .board: return Endpoints.boardRequestURL
        case .newCard: return Endpoints.newCardRequestURL
        }
    }
    
    private var method: HTTPMethod {
        switch self {
        case .board: return .get
        case .newCard: return .post
        }
    }
    
    private var query: String? {
        switch self {
        default: return nil
        }
    }
    
    private var body: Data? {
        switch self {
        case let .newCard(card): return encode(card)
        default: return nil
        }
    }
    
    private var url: URL? {
        guard var urlComponents = URLComponents(string: path) else { return nil }
        urlComponents.query = query
        return urlComponents.url
    }
    
    var urlRequest: URLRequest? {
        guard let url = url else { return nil }
        var request = URLRequest(url: url)
        request.httpMethod = method.rawValue
        request.httpBody = body
        return request
    }
    
    private func encode<T: Encodable>(_ value: T) -> Data? {
        let data: Data
        do {
            data = try JSONEncoder().encode(value)
        } catch {
            return nil
        }
        return data
    }
}

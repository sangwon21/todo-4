//
//  APIRouter.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/07.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import Foundation

enum HTTPMethod: String {
    case get = "GET"
    case post = "POST"
}

protocol APIRouter {
    var path: String { get }
    var method: HTTPMethod { get }
    var query: String? { get }
    var body: Data? { get }
    func url() -> URL?
    func urlRequest() -> URLRequest?
}

extension APIRouter {
    func url() -> URL? {
        guard var urlComponents = URLComponents(string: path) else { return nil }
        urlComponents.query = query
        return urlComponents.url
    }
    
    func urlRequest() -> URLRequest? {
        guard let url = url() else { return nil }
        var request = URLRequest(url: url)
        request.httpMethod = method.rawValue
        request.httpBody = body
        return request
    }
    
    func encode<T: Encodable>(_ value: T) -> Data? {
        let data: Data
        do {
            data = try JSONEncoder().encode(value)
        } catch {
            return nil
        }
        return data
    }
}

enum APIBuilder: APIRouter {
    case board
    case newCard(card: Card)
    
    var path: String {
        switch self {
        case .board: return Endpoints.boardRequestURL
        case .newCard: return Endpoints.newCardRequestURL
        }
    }
    
    var method: HTTPMethod {
        switch self {
        case .board: return .get
        case .newCard: return .post
        }
    }
    
    var query: String? {
        switch self {
        default: return nil
        }
    }
    
    var body: Data? {
        switch self {
        case let .newCard(card): return encode(card)
        default: return nil
        }
    }
}

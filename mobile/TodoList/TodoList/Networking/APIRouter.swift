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
    case delete = "DELETE"
}

protocol APIRouter {
    var path: String { get }
    var method: HTTPMethod { get }
    var query: String? { get }
    var header: [String: String] { get }
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
        header.forEach { request.setValue($1, forHTTPHeaderField: $0) }
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
    case newCard(listID: Int, card: Card)
    case deleteCard(listID: Int, card: Card)
    case activities
    
    var path: String {
        switch self {
        case .board: return Endpoints.boardURL
        case let .newCard(id, _): return Endpoints.boardURL + "/\(id)" + Endpoints.listPath
        case let .deleteCard(id, _): return Endpoints.boardURL + "/\(id)" + Endpoints.listPath
        case .activities: return Endpoints.activitiesURL
        }
    }
    
    var method: HTTPMethod {
        switch self {
        case .board, .activities: return .get
        case .newCard: return .post
        case .deleteCard: return .delete
        }
    }
    
    var query: String? {
        switch self {
        default: return nil
        }
    }
    
    var header: [String: String] {
        switch self {
        case .newCard, .deleteCard: return ["Content-Type": "application/json"]
        default: return [:]
        }
    }
    
    var body: Data? {
        switch self {
        case let .newCard(_, card): return encode(CardRequest(card: card))
        case let .deleteCard(_, card): return encode(CardRequest(card: card))
        default: return nil
        }
    }
}

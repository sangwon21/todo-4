//
//  NetworkManager.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/07.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import Foundation

enum HTTPError: Error {
   case notFound
   
   var localizedDescription: String {
       switch self {
       case .notFound: return "Not Found"
       }
   }
}

class NetworkManager {
    private let session: URLSession
    
    init(session: URLSession = .shared) {
        self.session = session
    }
    
    func requestBoard(completion: @escaping (Result<Board, Error>) -> Void) {
        guard let request = APIBuilder.board.urlRequest() else { return }
        
        session.dataTask(with: request) { data, _, error in
            if let error = error {
                completion(.failure(error))
                return
            }
            guard let data = data else { return }
            do {
                let response = try JSONDecoder().decode(BoardResponse.self, from: data)
                completion(.success(response.board))
            } catch {
                completion(.failure(error))
            }
        }.resume()
    }
    
    func requestNewCard(card: Card, completion: @escaping (Result<CardIDResponse, Error>) -> Void) {
        guard let request = APIBuilder.newCard(card: card).urlRequest() else { return }
        
        session.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }
            guard let data = data, let httpResponse = response as? HTTPURLResponse else { return }
            if !httpResponse.isValid() { completion(.failure(HTTPError.notFound)) }
            do {
                let response = try JSONDecoder().decode(CardIDResponse.self, from: data)
                completion(.success(response))
            } catch {
                completion(.failure(error))
            }
        }.resume()
    }
}

private extension HTTPURLResponse {
    func isValid() -> Bool {
        switch statusCode {
        case 200..<300: return true
        default: return false
        }
    }
}

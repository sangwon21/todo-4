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
    
    private func request(with request: URLRequest?,
                         completion: @escaping (Result<Data, Error>) -> Void) {
        guard let request = request else { return }
        
        session.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }
            guard let data = data, let httpResponse = response as? HTTPURLResponse else { return }
            if httpResponse.isValid() {
                completion(.success(data))
            } else {
                completion(.failure(HTTPError.notFound))
            }
        }.resume()
    }
}

extension NetworkManager {
    
    func requestBoard(completion: @escaping (Result<Board, Error>) -> Void) {
        request(with: APIBuilder.board.urlRequest()) { result in
            switch result {
            case let .failure(error): completion(.failure(error))
            case let .success(data):
                do {
                    let response = try JSONDecoder().decode(Board.self, from: data)
                    completion(.success(response))
                } catch {
                    completion(.failure(error))
                }
            }
        }
    }
    
    func requestNewCard(listID: Int,
                        card: Card,
                        completion: @escaping (Result<CardIDResponse, Error>) -> Void) {
        request(with: APIBuilder.newCard(listID: listID, card: card).urlRequest()) { result in
            switch result {
            case let .failure(error): completion(.failure(error))
            case let .success(data):
                do {
                    let response = try JSONDecoder().decode(CardIDResponse.self, from: data)
                    completion(.success(response))
                } catch {
                    completion(.failure(error))
                }
            }
        }
    }
    
    func requestDelete(listID: Int, card: Card, completion: @escaping (Result<Bool, Error>) -> Void) {
        request(with: APIBuilder.deleteCard(listID: listID, card: card).urlRequest()) { result in
            switch result {
            case let .failure(error): completion(.failure(error))
            case .success: completion(.success(true))
            }
        }
    }
    
    func requestActivities(completion: @escaping (Result<ActivitiesResponse, Error>) -> Void) {
        request(with: APIBuilder.activities.urlRequest()) { result in
            switch result {
            case let .failure(error): completion(.failure(error))
            case let .success(data):
                do {
                    let response = try JSONDecoder().decode(ActivitiesResponse.self, from: data)
                    completion(.success(response))
                } catch {
                    completion(.failure(error))
                }
            }
        }
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

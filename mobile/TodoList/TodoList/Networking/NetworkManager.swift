//
//  NetworkManager.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/07.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import Foundation

class NetworkManager {
    private let session: URLSession
    
    init(session: URLSession = .shared) {
        self.session = session
    }
    
    func requestBoard(completion: @escaping (Result<Board, Error>) -> Void) {
        guard let request = APIRouter.board.urlRequest else { return }
        
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
}

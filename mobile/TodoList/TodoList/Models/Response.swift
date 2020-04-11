//
//  Response.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/11.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import Foundation

protocol Response {
    var statusCode: StatusCode { get }
}

extension Response {
    func validate(statusCode: StatusCode, block: (Result<Response, Error>) -> Void) {
        if self.statusCode == statusCode {
            block(.success(self))
        } else {
            block(.failure(HTTPError.badRequest))
        }
    }
}

enum StatusCode: String, Decodable {
    case ok = "200"
    case error = "400"
}

enum HTTPError: Error {
   case badRequest
   
   var localizedDescription: String {
       switch self {
       case .badRequest: return "Bad Request"
       }
   }
}

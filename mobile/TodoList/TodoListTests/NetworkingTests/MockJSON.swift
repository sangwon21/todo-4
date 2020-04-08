//
//  MockJSON.swift
//  TodoListTests
//
//  Created by Chaewan Park on 2020/04/08.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import Foundation

let boardResponseJSON = """
{
   "board":
    {
        "list": [
        {
            "title": "Todo",
            "cards": [
            {
                "id": "0",
                "title": "GitHub",
                "detail": "add, commit, push",
                "author": "author by iOS"
                
            },
            {
                "id": "1",
                "title": "HIG",
                "detail": "pretty",
                "author": "author by iOS"
                
            }]
        }]
        
    }
}
""".utf8

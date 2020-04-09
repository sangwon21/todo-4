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
        "lists": [
        {
            "title": "해야 할 일",
            "cards": [
            {
                "id": "0",
                "title": "GitHub 공부하기",
                "detail": "add, commit, push",
                "author": "author by web"
            },
            {
                "id": "1",
                "title": "HIG 공부하기",
                "detail": "Pretty is best",
                "author": "author by iOS"
            }]
        },
        {
            "title": "하고 있는 일",
            "cards": [
            {
                "id": "2",
                "title": "기획서 리뷰",
                "detail": "투두 리스트 만들기\\n- 새 카드 추가하기\\n- 카드 삭제하기",
                "author": "author by web"
            }]
        },
        {
            "title": "완료한 일",
            "cards": [
            {
                "id": "3",
                "title": "데일리 스크럼",
                "detail": "아자아자",
                "author": "author by web"
            }]
        }]
    }
}
""".data(using: .utf8)!

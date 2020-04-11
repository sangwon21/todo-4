//
//  BoardResponseJSONMock.swift
//  TodoListTests
//
//  Created by Chaewan Park on 2020/04/08.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import Foundation

let boardResponseJSONMock = """
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
            },
            {
                "id": "4",
                "title": "끝내주게 숨쉬기",
                "detail": "Pretty is best",
                "author": "author by iOS"
            },
            {
                "id": "5",
                "title": "간지나게 자기",
                "detail": "Pretty is best",
                "author": "author by iOS"
            },
            {
                "id": "6",
                "title": "작살나게 밥먹기",
                "detail": "Pretty is best",
                "author": "author by iOS"
            },
            {
                "id": "7",
                "title": "메일 보내기",
                "detail": "Pretty is best",
                "author": "author by iOS"
            },
            {
                "id": "8",
                "title": "수업 듣기",
                "detail": "Pretty is best",
                "author": "author by iOS"
            },
            {
                "id": "9",
                "title": "집에 가서 자기",
                "detail": "Pretty is best",
                "author": "author by iOS"
            },
            {
                "id": "10",
                "title": "코드스쿼드 출근하기",
                "detail": "Pretty is best",
                "author": "author by iOS"
            },
            {
                "id": "11",
                "title": "블로그 도메인 연결하기",
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
            },
            {
                "id": "12",
                "title": "공부",
                "detail": "과연 할까?",
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

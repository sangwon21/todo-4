//
//  CardListViewModelTests.swift
//  TodoListTests
//
//  Created by Chaewan Park on 2020/04/06.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import XCTest
@testable import TodoList

class CardListViewModelTests: XCTestCase {
    
    func testNoList() {
        let expectation = XCTestExpectation(description: "changeHandler 호출 확인")
        let viewModel = CardListViewModel(with: nil) { list in
            XCTAssertNil(list)
            expectation.fulfill()
        }
        XCTAssertEqual(viewModel.cardCount, 0)
        wait(for: [expectation], timeout: 4.0)
    }
    
    func testSomeLists() {
        let cardCount = 6
        let expectation = XCTestExpectation(description: "changeHandler 호출 확인")
        let viewModel = CardListViewModel(with: List(with: cardCount)) { list in
            XCTAssertNotNil(list)
            expectation.fulfill()
        }
        XCTAssertEqual(viewModel.cardCount, cardCount)
        (0..<cardCount).forEach { XCTAssertEqual(viewModel.card(at: $0), Card()) }
        wait(for: [expectation], timeout: 4.0)
    }
    
    func testUpdateList() {
        let cardCount = 22
        let expectation = XCTestExpectation(description: "업데이트에 대한 알림 확인")
        let viewModel = CardListViewModel(with: nil)
        viewModel.updateNotify { list in
            XCTAssertNotNil(list)
            XCTAssertEqual(list?.cards.count, cardCount)
            expectation.fulfill()
        }
        viewModel.update(list: List(with: cardCount))
        wait(for: [expectation], timeout: 4.0)
    }
}

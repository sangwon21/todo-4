//
//  BoardViewController.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/06.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import UIKit

class BoardViewController: UIViewController {

    @IBOutlet weak var boardStackView: UIStackView!
    
    private var networkManager: NetworkManager?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        configureSession()
        
        setupTodoLists(for: 3)
        
        requestBoard()
    }
    
    private func configureSession() {
        let config = URLSessionConfiguration.ephemeral
        config.protocolClasses = [URLProtocolMock.self]
        networkManager = NetworkManager(session: URLSession(configuration: config))
    }
    
    private func setupTodoLists(for number: Int) {
        (0..<number).forEach { [unowned self] _ in
            if let viewController = storyboard?
                .instantiateViewController(withIdentifier: CardListViewController.reuseIdentifier) {
                self.boardStackView.addArrangedSubview(viewController.view)
            }
        }
    }
}

extension BoardViewController {
    private func requestBoard() {
        networkManager?.requestBoard { result in
            switch result {
            case .failure: print("failure")
            case let .success(board): print(board)
            }
        }
    }
}

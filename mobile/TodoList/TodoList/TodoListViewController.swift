//
//  TodoListViewController.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/06.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import UIKit

class TodoListViewController: UIViewController {

    @IBOutlet weak var todoListStackView: UIStackView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setupTodoLists(for: 2)
    }
    
    private func setupTodoLists(for number: Int) {
        (0..<number).forEach { [unowned self] _ in
            if let viewController = storyboard?
                .instantiateViewController(withIdentifier: CardListViewController.reuseIdentifier) {
                self.todoListStackView.addArrangedSubview(viewController.view)
            }
        }
    }
}


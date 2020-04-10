//
//  FormViewController.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/09.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import UIKit

class FormViewController: UIViewController {
    
    @IBOutlet weak var scrollView: UIScrollView!
    
    private let observers = Observers()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        addKeyboardObservers()
    }
    
    deinit {
        observers.removeObservers()
    }
    
    private func addKeyboardObservers() {
        observers.addKeyboardShowObserver { [weak self] keyboardFrame in
            let contentInset = UIEdgeInsets(
                top: 0.0,
                left: 0.0,
                bottom: keyboardFrame.size.height,
                right: 0.0)
            self?.scrollView.contentInset = contentInset
            self?.scrollView.scrollIndicatorInsets = contentInset
        }
        
        observers.addKeyboardHideObserver { [weak self] in
            let contentInset = UIEdgeInsets.zero
            self?.scrollView.contentInset = contentInset
            self?.scrollView.scrollIndicatorInsets = contentInset
        }
    }
}

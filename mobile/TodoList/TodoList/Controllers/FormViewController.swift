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
        observers.addKeyboardShowObserver { [weak self] keyboardHeight in
            self?.scrollView.contentInset.bottom = keyboardHeight
            self?.scrollView.verticalScrollIndicatorInsets.bottom = keyboardHeight
            if let textView = UIResponder.currentFirstResponder as? UITextView {
                self?.scrollView.scrollRectToVisible(textView.frame, animated: true)
            }
        }
        
        observers.addKeyboardHideObserver { [weak self] in
            let contentInset = UIEdgeInsets.zero
            self?.scrollView.contentInset = contentInset
            self?.scrollView.scrollIndicatorInsets = contentInset
        }
    }
    
    @IBAction func cancel(_ sender: Any) {
        dismiss(animated: true)
    }
}

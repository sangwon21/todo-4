//
//  FormViewController.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/09.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import UIKit

protocol FormViewControllerDelegate: class {
    func newCardDidSubmit(viewController: FormViewController, card: Card)
}

class FormViewController: UIViewController {
    
    @IBOutlet weak var scrollView: UIScrollView!
    @IBOutlet weak var titleLabel: UITextField!
    @IBOutlet weak var detailTextView: UITextView!
    @IBOutlet weak var authorLabel: UILabel!
    
    private let observers = Observers()
    
    var listID: Int?
    
    weak var delegate: FormViewControllerDelegate?
    
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
    
    @IBAction func submit(_ sender: Any) {
        let card = Card(id: "",
                        title: titleLabel.text ?? "",
                        detail: detailTextView.text,
                        author: authorLabel.text ?? "")
        delegate?.newCardDidSubmit(viewController: self, card: card)
        dismiss(animated: true)
    }
}

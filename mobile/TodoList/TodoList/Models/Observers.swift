//
//  Observers.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/09.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import UIKit

class Observers {
    private var observers = [NSObjectProtocol]()
    private let center = NotificationCenter.default
    
    func addObserver(forName name: NSNotification.Name, using block: @escaping (Any?) -> Void) {
        let observer = center.addObserver(forName: name, object: nil, queue: .main) { block($0.object) }
        observers.append(observer)
    }
    
    func addObserver(_ observer: NSObjectProtocol) {
        observers.append(observer)
    }
    
    func removeObservers() {
        observers.forEach { center.removeObserver($0) }
    }
}

extension Observers {
    func addKeyboardShowObserver(using block: @escaping (CGFloat) -> Void) {
        let observer = center.addObserver(forName: UIResponder.keyboardWillShowNotification,
                                          object: nil,
                                          queue: .main) {
            guard let userInfo = $0.userInfo,
                let keyboardFrame = userInfo[UIResponder.keyboardFrameEndUserInfoKey] as? CGRect else { return }
            block(keyboardFrame.size.height)
        }
        observers.append(observer)
    }
    
    func addKeyboardHideObserver(using block: @escaping () -> Void) {
        let observer = center.addObserver(forName: UIResponder.keyboardWillHideNotification,
                                          object: nil,
                                          queue: .main) { _ in
            block()
        }
        observers.append(observer)
    }
}

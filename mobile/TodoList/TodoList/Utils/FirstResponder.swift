//
//  FirstResponder.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/10.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import UIKit

extension UIResponder {

    private static weak var firstResponder: UIResponder?

    static var currentFirstResponder: UIResponder? {
        firstResponder = nil
        
        UIApplication.shared.sendAction(
            #selector(UIResponder.findFirstResponder(_:)),
            to: nil,
            from: nil,
            for: nil)

        return firstResponder
    }

    @objc func findFirstResponder(_ sender: Any) {
        UIResponder.firstResponder = self
    }
}

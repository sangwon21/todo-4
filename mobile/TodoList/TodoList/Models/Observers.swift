//
//  Observers.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/09.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import Foundation

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

//
//  Drag.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/16.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import UIKit

class Drag {
    static func item<T>(from object: T) -> UIDragItem {
        let description = String(describing: object)
        let itemProvider = NSItemProvider(object: description as NSItemProviderWriting)
        let dragItem = UIDragItem(itemProvider: itemProvider)
        dragItem.localObject = object
        return dragItem
    }
}

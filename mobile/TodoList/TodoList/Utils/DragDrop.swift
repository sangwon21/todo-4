//
//  DragDrop.swift
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

class Drop {
    static func objects<T>(from coordinator: UITableViewDropCoordinator) -> [T] {
        return coordinator.items.map { Drop.object(from: $0) }.compactMap { $0 }
    }
    
    private static func object<T>(from item: UITableViewDropItem) -> T? {
        guard let object = item.dragItem.localObject as? T else { return nil }
        return object
    }
}

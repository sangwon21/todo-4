//
//  UILoader.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/09.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import UIKit

class UILoader {
    static func load<T>(viewControllerType: T.Type,
                        from storyboard: UIStoryboard?) -> T? where T: ReusableView {
        guard let storyboard = storyboard else { return nil }
        return storyboard.instantiateViewController(withIdentifier: T.reuseIdentifier) as? T
    }
}

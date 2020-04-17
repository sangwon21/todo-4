//
//  ActivitiesViewController.swift
//  TodoList
//
//  Created by Chaewan Park on 2020/04/17.
//  Copyright © 2020 Chaewan Park. All rights reserved.
//

import UIKit

class ActivitiesViewController: UITableViewController {
    
    var networkManager: NetworkManager?
    
    let reuseIdentifier = "ActivityCell"
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        requestActivities()
    }
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 0
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 0
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: reuseIdentifier, for: indexPath)
        return cell
    }
}

extension ActivitiesViewController {
    private func requestActivities() {
        networkManager?.requestActivities { [weak self] result in
            switch result {
            case .failure: return
            case .success: DispatchQueue.main.async { self?.tableView.reloadData() }
            }
        }
    }
}

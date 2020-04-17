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
    
    private var activities = [Activity]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        requestActivities()
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return activities.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: reuseIdentifier, for: indexPath)
        let activity = activities[indexPath.row]
        cell.textLabel?.text = "\(activity.action) \(activity.description) \(activity.suffix ?? "")"
        cell.detailTextLabel?.text = "\(activity.time)"
        return cell
    }
}

extension ActivitiesViewController {
    private func requestActivities() {
        networkManager?.requestActivities { [weak self] result in
            switch result {
            case .failure: return
            case let .success(activities):
                self?.activities = activities
                DispatchQueue.main.async { self?.tableView.reloadData() }
            }
        }
    }
}

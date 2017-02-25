import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    public currentUser: User;
    public users: User[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    public ngOnInit() {
        this.loadAllUsers();
    }

    public deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers(); });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe((users) => { this.users = users; });
    }
}

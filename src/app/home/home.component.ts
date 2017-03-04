import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';
import { UserService, AngularFireService } from '../_services/index';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    public currentUser: User;
    public users: User[] = [];

    constructor(private userService: UserService, public angularFireService: AngularFireService) {
        if (this.angularFireService.getUser() != null) {
            this.currentUser = this.angularFireService.getUser();
        } else {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
        console.log(this.currentUser);
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

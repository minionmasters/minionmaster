import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';
import { UserService, AngularFireService } from '../_services/index';
import { FirebaseListObservable } from 'angularfire2';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    public currentUser: User;
    public users: User[] = [];
    public newTruck: string;
    public trucks: FirebaseListObservable<any>;
    public firstName: string;
    public img: string;

    constructor(private userService: UserService, public angularFireService: AngularFireService) {
        if (this.angularFireService.getUser() != null) {
            this.currentUser = this.angularFireService.getUser();
            if (this.currentUser.firstName != null) {
                this.firstName = this.currentUser.firstName;
            } else {
                this.firstName = 'Friend';
            }

            if (this.currentUser.img != null) {
                this.img = 'currentUser.img';
            }
        } else {
            this.angularFireService.logout();
        }
        // else {
        //     this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // }
        this.trucks = this.angularFireService.trucks;
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

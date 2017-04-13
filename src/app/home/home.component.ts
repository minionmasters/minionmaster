import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { User } from '../_models/index';
import { UserService, AngularFireService } from '../_services/index';
import { FirebaseListObservable } from 'angularfire2';

import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import * as Papa from '@boogiesox/papaparse';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    public currentUser: User;
    public users: User[] = [];
    public newTruck: string;
    public trucks: FirebaseListObservable<any>;
    public firstName: string;
    public img: string;

    constructor(private userService: UserService, public angularFireService: AngularFireService,
                overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
        // this.trucks = this.angularFireService.trucks;
        overlay.defaultViewContainer = vcRef;
    }

    public ngOnInit() {
        // this.loadAllUsers();
        if (this.angularFireService.getUser() != null) {
            this.currentUser = this.angularFireService.getUser();
            if (this.currentUser.firstName != null) {
                this.firstName = this.currentUser.firstName;
            } else {
                this.firstName = 'Friend';
            }

        //     if (this.currentUser.img != null) {
        //         this.img = 'currentUser.img';
        //     }
        } else {
            this.angularFireService.logout();
        }
    }

    public onChange(event) {
        let files = event.srcElement.files;
        console.log(files);
        Papa.parse(files[0].name, {
            complete: (results) => {
                console.log('Finished:', results.data);
            }
        });
        // Papa.parse(files[0].name);
    }

    public onClick() {
        this.modal.alert()
            .size('lg')
            .showClose(true)
            .title('Create Route')
            .body(`
                <h4>First things first, lets import all your addresses.</h4>
                <button>Import from Excel</button>
            `)
            .open();
    }

    public deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers(); });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe((users) => { this.users = users; });
    }
}

import { Component, OnInit } from '@angular/core';
import { AngularFireService } from '../_services/index';
import { FirebaseListObservable } from 'angularfire2';

import { User } from '../_models/index';

@Component({
    selector: 'truck',
    templateUrl: 'truck.component.html'
})

export class TruckComponent implements OnInit {
    public currentUser: User;
    public newTruck: string;
    public trucks: FirebaseListObservable<any>;

    constructor(public angularFireService: AngularFireService) {
        this.trucks = this.angularFireService.addresses;
    }

    public addTruck() {
        this.angularFireService.addTruck();
    }

    public deleteTruck(truck) {
        this.angularFireService.deleteTruck(truck);
    }

    public ngOnInit() {
        this.currentUser = this.angularFireService.getUser();
        this.trucks = this.angularFireService.getAddresses(this.currentUser.id);
    }
}

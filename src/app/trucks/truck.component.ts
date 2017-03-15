import { Component, OnInit } from '@angular/core';
import { AngularFireService } from '../_services/index';
import { FirebaseListObservable } from 'angularfire2';

@Component({
    selector: 'truck',
    templateUrl: 'truck.component.html'
})

export class TruckComponent {
    public newTruck: string;
    public trucks: FirebaseListObservable<any>;

    constructor(public angularFireService: AngularFireService) {
        this.trucks = this.angularFireService.trucks;
    }

    public addTruck() {
        this.angularFireService.addTruck();
    }
}

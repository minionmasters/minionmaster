import { Component, OnInit } from '@angular/core';
import { AngularFireService } from '../_services/index';
import { FirebaseListObservable } from 'angularfire2';

@Component({
    selector: 'truck',
    templateUrl: 'truck.component.html'
})

export class TruckComponent implements OnInit {
    public newTruck: string;
    public trucks: FirebaseListObservable<any>;

    constructor(public angularFireService: AngularFireService) {
        this.trucks = this.angularFireService.trucks;
    }

    public addTruck() {
        this.angularFireService.addTruck();
    }

    public deleteTruck(truck) {
        this.angularFireService.deleteTruck(truck);
    }

    public ngOnInit() {
        this.trucks = this.angularFireService.trucks;
        console.log(this.trucks);
    }
}

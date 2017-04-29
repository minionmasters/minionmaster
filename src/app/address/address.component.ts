import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { User } from '../_models/index';
import { UserService, AngularFireService } from '../_services/index';
import { FirebaseListObservable } from 'angularfire2';

import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
    selector: 'address',
    templateUrl: 'address.component.html',
    styleUrls: ['address.component.css']
})

export class AddressComponent implements OnInit {
    public currentUser: User;
    public newTruck: string;
    public addresses: FirebaseListObservable<any>;

    constructor(public angularFireService: AngularFireService) {
        this.addresses = this.angularFireService.addresses;
    }

    public addAddress(address) {
        this.angularFireService.addAddress(address);
    }

    public deleteAddress(address) {
        this.angularFireService.deleteAddress(address);
    }

    public showAddress() {
        console.log(this.addresses);
    }

    public ngOnInit() {
        this.currentUser = this.angularFireService.getUser();
        this.addresses = this.angularFireService.getAddresses(this.currentUser.id);
    }
}

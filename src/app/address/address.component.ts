import { Component, OnInit, ViewContainerRef, ElementRef, NgZone, ViewChild } from '@angular/core';
import { User } from '../_models/index';
import { UserService, AngularFireService } from '../_services/index';
import { FirebaseListObservable } from 'angularfire2';

import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { FormControl } from '@angular/forms';
import { MapsAPILoader } from 'angular2-google-maps/core';

declare var google: any;

@Component({
    selector: 'address',
    templateUrl: 'address.component.html',
    styleUrls: ['address.component.css']
})

export class AddressComponent implements OnInit {
    public currentUser: User;
    public newTruck: string;
    public addresses: FirebaseListObservable<any>;
    public addressList: string[];

    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;

    @ViewChild('search')
    public searchElementRef: ElementRef;

    constructor(
        public angularFireService: AngularFireService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {
        this.addresses = this.angularFireService.addresses;
    }

    public addAddress(address) {
        console.log(address);
        this.angularFireService.addAddress(address);
    }

    public deleteAddress(address) {
        this.angularFireService.deleteAddress(address);
    }

    public showAddress() {
        let addressList = [];
        this.addresses.forEach((element) => {
            element.forEach((test) => {
                addressList.push(test.Address);
            });
        });
        this.addressList = addressList;
        console.log(this.addressList);
    }

    public ngOnInit() {
        this.currentUser = this.angularFireService.getUser();
        this.addresses = this.angularFireService.getAddresses(this.currentUser.id);
        // set google maps defaults
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        // create search FormControl
        this.searchControl = new FormControl();

        // set current position
        this.setCurrentPosition();

        // load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
        let autocomplete = new
                google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
            types: ['address']
        });
        autocomplete.addListener('place_changed', () => {
            this.ngZone.run(() => {
            // get the place result
            let place = google.maps.places.PlaceResult = autocomplete.getPlace();

            // verify result
            if (place.geometry === undefined || place.geometry === null) {
                return;
            }

            // set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 13;
            });
        });
        });
    }

    private setCurrentPosition() {
        if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.zoom = 12;
        });
        }
    }
}

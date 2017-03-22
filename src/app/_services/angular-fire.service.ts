import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods,
      FirebaseListObservable } from 'angularfire2';

import { User } from '../_models/index';

@Injectable()
export class AngularFireService {
  public currentUser: User;
  public trucks: FirebaseListObservable<any>;

  constructor(public af: AngularFire) {
    if (this.getUser() != null) {
      this.currentUser = this.getUser();
    }
    this.getTrucks(this.currentUser.id);
  }

  public getTrucks(id) {
    this.checkUserDb(this.currentUser.id);
    let url = 'users/' + id + '/trucks';
    let ref =  this.af.database.object(url);
    this.trucks = this.af.database.list(url);
    return this.trucks;
  }

  // Logs in the user
  public loginWithGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
  }

  // Logs out the current user
  public logout() {
    return this.af.auth.logout();
  }

  public getUser() {
    this.currentUser = new User();
    this.af.auth.subscribe((auth) => {
        if (auth) {
            this.currentUser.firstName = auth.google.displayName;
            this.currentUser.img = auth.google.photoURL;
            this.currentUser.id = auth.google.uid;
        } else {
          // User is not authenticated
        }
    });
    if (this.currentUser.firstName) {
      return this.currentUser;
    } else {
      return null;
    }
  }

  public checkUserDb(id) {
    let url = '/users/' + id;
    let name = '';
    if (this.currentUser.username) {
      name = this.currentUser.username;
    }

    let firstName = '';
    if (this.currentUser.firstName) {
      firstName = this.currentUser.firstName;
    }

    let lastName = '';
    if (this.currentUser.lastName) {
      lastName = this.currentUser.lastName;
    }

    let ref =  this.af.database.object(url);
    ref.update({
        user_name: name,
        first_name: firstName,
        last_name: lastName
    });
  }

  public addTruck() {
    let id = this.currentUser.id;
    let truckId = Math.floor((Math.random() * 100) + 1);
    let url = '/users/' + id + '/trucks/' + 'truck' + truckId;
    let ref =  this.af.database.object(url);
    ref.update({
        truck_id: truckId
    });
    console.log('Truck #' + truckId + ' created!');
  }

  public deleteTruck(truck) {
    this.trucks.remove(truck);
  }
}

import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods,
      FirebaseListObservable } from 'angularfire2';

import { User } from '../_models/index';

@Injectable()
export class AngularFireService {
  public currentUser: User;
  public trucks: FirebaseListObservable<any>;

  constructor(public af: AngularFire) {
    this.trucks = this.af.database.list('trucks');
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

  public addTruck() {
    let truck = { name: 'test' };
    this.trucks.push(truck);
  }
}

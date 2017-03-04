import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireService } from '../_services/index';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, public afService: AngularFireService) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let isLoggedIn: boolean;
        // This asynchronously checks if our user is logged it and will automatically
        // redirect them to the Login page when the status changes.
        // This is just a small thing that Firebase does that makes it easy to use.
        this.afService.af.auth.subscribe(
            (auth) => {
                if (auth == null) {
                    isLoggedIn = false;
                } else {
                    isLoggedIn = true;
                }
            }
        );

        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        if (isLoggedIn === true) {
            return true;
        } else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }
}

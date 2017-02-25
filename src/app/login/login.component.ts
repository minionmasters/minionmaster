import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    public model: any = {};
    public loading = false;
    public returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    public ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    public login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                (data) => {
                    this.router.navigate([this.returnUrl]);
                },
                (error) => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService, AngularFireService } from '../_services/index';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
    public model: any = {};
    public loading = false;
    public returnUrl: string;
    public img: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        public angularFireService: AngularFireService,
        private alertService: AlertService) { }

    public ngOnInit() {
        this.img = '../../assets/google_sign_in.png';
        // reset login status
        this.angularFireService.logout();

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

    public loginWithGoogle() {
        this.loading = true;
        this.angularFireService.loginWithGoogle().then((data) => {
            // Send them to the homepage if they are logged in
            this.router.navigate([this.returnUrl]);
        }).catch((error) => {
            this.alertService.error(error.message);
            this.loading = false;
        });
    }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, UserService } from '../_services/index';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    public model: any = {};
    public loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    public register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                (data) => {
                    // set success message and pass true paramater to persist
                    // the message after redirecting to the login page
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                (error) => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}

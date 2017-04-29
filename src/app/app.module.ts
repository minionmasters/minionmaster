import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService,
                AngularFireService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { TruckComponent } from './trucks/index';
import { RegisterComponent } from './register/index';
import { AddressComponent } from './address/index';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyDJ5MsJdwOIjgQTZFK5oyFzvh-VDU10HYM',
  authDomain: 'minionmaster-f9839.firebaseapp.com',
  databaseURL: 'https://minionmaster-f9839.firebaseio.com',
  storageBucket: 'minionmaster-f9839.appspot.com',
  messagingSenderId: '246977860853'
};

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        AngularFireModule.initializeApp(firebaseConfig),
        ModalModule.forRoot(),
        BootstrapModalModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        TruckComponent,
        AddressComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        AngularFireService,

        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }

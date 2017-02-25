import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import { Component } from '@angular/core';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { HomeComponent } from './home.component';

class MockUserService { };

describe(`Home`, () => {
  let comp: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  // async beforeEach
  beforeEach(async(() => {
    // TestBed.configureTestingModule({
    //   declarations: [HomeComponent],
    //   schemas: [NO_ERRORS_SCHEMA],
    //   providers: [
    //     BaseRequestOptions,
    //     MockBackend,
    //     {
    //       provide: Http,
    //       useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
    //         return new Http(backend, defaultOptions);
    //       },
    //       deps: [MockBackend, BaseRequestOptions]
    //     },
    //     {
    //       provide: UserService,
    //       useValue: MockBackend
    //     },
    //   ],
    // })
    // .compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    // fixture = TestBed.createComponent(HomeComponent);
    // comp = fixture.componentInstance;

    // fixture.detectChanges(); // trigger initial data binding
  });

  it('should have default data', () => {
    // expect(comp).toBeDefined();
  });

});

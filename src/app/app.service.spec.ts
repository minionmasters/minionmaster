import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

// Load the implementations that should be tested
import { AppComponent } from './app.component';
import { AppState } from './app.service';

describe(`AppState without a test bed`, () => {
  let service: AppState;
  beforeEach(() => { service = new AppState(); });

  it('set #state should not allow mutation', () => {
    expect(service.set('test', 1)).toEqual(1);
  });
});

import { ActivatedRoute, Data } from '@angular/router';
import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { TruckComponent } from './truck.component';

describe('Truck', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      // provide a better mock
      {
        provide: ActivatedRoute,
        useValue: {
          data: {
            subscribe: (fn: (value: Data) => void) => fn({
              yourData: 'yolo'
            })
          }
        }
      },
      TruckComponent
    ]
  }));

  it('should log ngOnInit', inject([TruckComponent], (truck: TruckComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    truck.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});

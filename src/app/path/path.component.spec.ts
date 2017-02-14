import { ActivatedRoute, Data } from '@angular/router';
import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { PathComponent } from './path.component';

describe('Path', () => {
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
      PathComponent
    ]
  }));

  it('should log ngOnInit', inject([PathComponent], (path: PathComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    path.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});

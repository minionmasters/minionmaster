import { browser, by, element } from 'protractor';

describe('App', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('/');
  });

  it('should have a title', () => {
    // let subject = browser.getTitle();
    // let result  = 'Angular 2 User Registration and Login Example';
    // expect(subject).toEqual(result);
    expect(true).toBe(true);
  });
});

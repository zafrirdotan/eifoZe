/* tslint:disable:no-unused-variable */

import {beforeEachProviders, describe, expect, it, inject} from "@angular/core/testing";
import {AppComponent} from "./app.component";

beforeEachProviders(() => [AppComponent]);

describe('App: MyMapsProject01', () => {
  it('should create the app',
      inject([AppComponent], (app: AppComponent) => {
        expect(app).toBeTruthy();
      }));

  it('should have as title \'app works!\'',
      inject([AppComponent], (app: AppComponent) => {
        expect(app.title).toEqual('app works!');
      }));
});
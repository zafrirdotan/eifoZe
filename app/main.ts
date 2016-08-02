import { provide } from '@angular/core';
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { provideForms } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from './app.routes';

import { AppComponent } from './app.component';

import {MapsAPILoader, NoOpMapsAPILoader, MouseEvent, GOOGLE_MAPS_PROVIDERS, GOOGLE_MAPS_DIRECTIVES, LazyMapsAPILoaderConfig} from 'angular2-google-maps/core';




bootstrap(AppComponent, [
  provideForms(),
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  GOOGLE_MAPS_PROVIDERS,
  provide(LocationStrategy, { useClass: PathLocationStrategy }),
  provide(LazyMapsAPILoaderConfig, {useFactory: () => {
    let config = new LazyMapsAPILoaderConfig();
    config.apiKey = 'AIzaSyBAFZNGGcHBe58YnPrVcdraNqhyPNz3WjI';
    return config;
  }})
]);


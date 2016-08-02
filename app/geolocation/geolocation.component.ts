/**
 * Created by ronen on 27/07/2016.
 */

import {Component, OnInit} from '@angular/core';
import {ngSelectLocation, EmitterService} from './ng2-location/browser-location';

@Component({
    selector: 'map',
    providers: [EmitterService],
    template: `
  <div class="center">
    <h2>Geolocation For Angular2 </h2>
    <ngLocation></ngLocation>
  </div>`,
    directives: [ngSelectLocation],
    pipes: [],
    styles:[`
  .center {
    background-color: #CFD8DC !important;
    text-align: center;
  }`]
})

export class SeedApp implements OnInit{
    public selectedCity:any;
    constructor(private EmitterService: EmitterService) {
        window.localStorage.removeItem("city");
    }

    ngOnInit(){
        this.selectedCity = localStorage.getItem('city');
        EmitterService.get("selectedCity").subscribe(data =>{
            this.selectedCity = data;
            localStorage.setItem('city', data);
        });
    }
}
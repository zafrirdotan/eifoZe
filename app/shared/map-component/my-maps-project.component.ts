import {Component, OnInit} from "@angular/core";
import {GOOGLE_MAPS_DIRECTIVES} from "angular2-google-maps/core";


@Component({
  moduleId: module.id,
  selector: 'my-maps-project-app',
  templateUrl: 'map-component.html',
  styleUrls: ['my-maps-project.component.css'],
  directives: [GOOGLE_MAPS_DIRECTIVES]
})
export class MyMapsProjectAppComponent implements OnInit{
  title: string = 'אנחנו על המפה, ואנחנו נשאר על המפה';

  lat: number = 32.088774;
  lng: number = 34.801673;
  markerTitle: string = "MisterBit";
  CAIcon: string = "../CA02.ico";
  
  latHome: number = 32.782548;
  lngHome: number = 35.014488;
  draggable: boolean = true;

  constructor (){}

  ngOnInit(){
  	if (navigator.geolocation) {
  		console.log('navigator.geolocation:');
  		navigator.geolocation.watchPosition(this.showPosition.bind(this), this.showError.bind(this));
  												// this.showError);
  	}
  }

  markerClicked(el){
  	console.log('click:', el);
  }

  dragEnded(el){
  	console.log('drag', el);
  }

  showPosition(pos){
  	var crd = pos.coords;
  	this.latHome = crd.latitude;
  	this.lngHome = crd.longitude;

  	console.warn('Your current position is:');
  	console.log('Latitude : ' + this.latHome);
  	console.log('Longitude: ' + this.lngHome);
  	console.log('More or less ' + crd.accuracy + ' meters.');
  }

  showError(error){
  	switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred");
            break;
    }
  }

}
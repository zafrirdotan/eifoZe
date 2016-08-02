import { Component, Directive ,OnInit,NgZone,provide,Output, EventEmitter} from '@angular/core';
import {ToggleButton} from '../directives/toggle-button';
import {GoogleMapsAPIWrapper ,MapsAPILoader, NoOpMapsAPILoader, MouseEvent, GOOGLE_MAPS_PROVIDERS, GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
import {MarkFilterPipe} from '../pipes/filter-list.pipe';
import {LayerService} from '../../layer/layer.service';
import {LayerModel} from "../../layer/layer.model";
import {MapLayerComponent} from '../mapLayers/map-layer.component';
import {LayerFilterComponent} from '../../layer/layer-filter.component';

interface marker {
    lat: number;
    lng: number;
    label?: string;
    isShown: boolean;
    symbol?: string;
    layerId: string;
}



@Component({
    moduleId: module.id,
    selector: 'sebm-google-map',
    directives: [GOOGLE_MAPS_DIRECTIVES,ToggleButton, MapLayerComponent],
    providers: [GoogleMapsAPIWrapper, LayerFilterComponent],
    pipes: [MarkFilterPipe],
    // providers: [ANGULAR2_GOOGLE_MAPS_PROVIDERS,layers],
    // providers: [LayerService],
    styles: [`
    .sebm-google-map-container {
       margin-top: 25%;
       height: 83% ;
     }
  `],

    template: `

    <div>
        <mapLayers [layers]="_layers" (onChange)="filterChanged($event)">map layers</mapLayers>
        <sebm-google-map 
        [latitude]="lat"
        [longitude]="lng"
        [zoom]="zoom"
        [disableDefaultUI]="false"
        [zoomControl]="false"
        (mapClick)="mapClicked($event)
            ">
            
        <sebm-google-map-marker 
            *ngFor="let m of _markers | markPipe; let i = index"
            
            (markerClick)="clickedMarker(m.label, i)"
            [latitude]="m.lat"
            [longitude]="m.lng"
            [label]="m.label"
            [markerDraggable]="m.draggable"
            (dragEnd)="markerDragEnd(m, $event)
            ">
            
            <sebm-google-map-info-window>
            
            <strong>{{m.label}}</strong>
            
            </sebm-google-map-info-window>
        </sebm-google-map-marker>
        <sebm-google-map-marker *ngIf="myPos"
          
          [latitude]="myPos.lat"
          [longitude]="myPos.lng"
          [label]="'Me'">
          
        
        </sebm-google-map-marker>
        </sebm-google-map>
    </div>

    <nav class="navbar navbar-default navbar-fixed-bottom">
        <a class="btn addLayer-btn" routerLink="/layer/edit">Add your own Layer</a>
    </nav>

   


`
})



export class MapComponent implements OnInit {

    state:boolean = false;
    // google maps zoom level
    zoom: number = 8;
    

    @Output() private locAdded = new EventEmitter;

    // center position for the map
    private _lat:number;
    private _lng:number;
    
    private _layers  : LayerModel[];
    private _markers : marker[] = [];
    private _myPos    : marker; 

    constructor(private _wrapper: GoogleMapsAPIWrapper, private layerService: LayerService){
         this._wrapper.getNativeMap().then((m) => {
             let options = {
                 minZoom: 2, maxZoom: 15,
                 disableDefaultUI: true,
                 draggable: false,
                 disableDoubleClickZoom: false,
                 panControl: false,
                 scaleControl: false,
             }})
        }


    ngOnInit(){
        //gets the current position
        this.getCurrentPosition();
        
        const prmLayers = this.layerService.query();
        prmLayers.then((layers:LayerModel[]) => {
            //by query it gets our layers to layers[]
            this._layers = layers;
            this._markers = [];
            layers.forEach(layer => this.createMarkers(layer));
        });

        //its allow to follow the location on moving.
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(this.showPosition.bind(this), this.showError.bind(this));
        }

    }
    
    //gets the current location and rendering it to the map
    getCurrentPosition () {
        let myPosition;
        navigator.geolocation.getCurrentPosition((pos) => {
            myPosition = {lat : pos.coords.latitude, lng : pos.coords.longitude, label:'Me'};
            this._lat = myPosition.lat;
            this._lng = myPosition.lng;
        })
    }

    createMarkers(layer) {
                    layer.locs.forEach(loc => {
                        const marker = Object.assign({}, loc, {layerId: layer.id , symbol : layer.symbol, isShown: false });
                        this._markers.push(marker);
                    })
                }



   

    clickedMarker(label: string, index: number){
        console.log(`clicked the marker: ${label || index}`)
    }

    mapClicked($event: MouseEvent){
        this.locAdded.emit($event.coords);
    }


    markerDragEnd(m: marker, $event: MouseEvent){
        // console.log('dragEnd', m, $event);
    }
    
    //function thats allow us to follow myPosition on the map
    showPosition(pos){
        let mySelf = {lat: 0, lng:0, isShown: true, label: 'Me', layerId: 'me'};
        mySelf.lat = pos.coords.latitude;
        mySelf.lng = pos.coords.longitude;
        // this._markers.push(mySelf);
    }

    showError(error){
        switch (error.code) {
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
        // autocomplete() {
        //     this._loader.load().then(() => {
        //         let autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocompleteInput"), {});
        //         google.maps.event.addListener(autocomplete, 'place_changed', () => {
        //             let place = autocomplete.getPlace();
        //             console.log(place);
        //         });
        //     })};
// }

    filterChanged(layer){
        // console.log('filterChanged',  layer);
        // console.log('before' ,this._markers);
        if(!layer.isShown){
            this._markers = this._markers.map((marker)=> {
                if(marker.layerId === layer.id){
                    const newMarker = Object.assign({}, marker, { isShown: true });
                    return newMarker;
                }else{
                    return marker;
                };
            });
            layer.isShown = !layer.ishown;
            // console.log( 'after:',this._markers, layer);
        }else{
             this._markers = this._markers.map((marker)=> {
                if(marker.layerId === layer.id){
                    const newMarker = Object.assign({}, marker, { isShown: false });
                    return newMarker;
                }else{
                    return marker;
                };
            });
            layer.isShown = !layer.isShown;
            // console.log( 'after:',this._markers, layer);
        }
    }
}

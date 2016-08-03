import { Component, OnInit, Input, Output, EventEmitter, SimpleChange} from '@angular/core';
import {MapComponent} from '../map-component/map.component';
import {LayerFilterComponent} from '../../layer/layer-filter.component'
import {LayerListComponent} from '../../layer/layer-list.component'
import {ToggleButton} from '../directives/toggle-button';
import {FilterByPipe} from '../../shared/pipes/filter-list.pipe';
import {LayerModel} from "../../layer/layer.model";

@Component({
    moduleId: module.id,
    selector: 'mapLayers',
    pipes: [FilterByPipe],
    directives: [LayerFilterComponent, ToggleButton, MapLayerComponent],
    styles: [``],
    template: `<section class="mapLayers">
                    <!--<layer-filter  (filterChange)="filter = $event"></layer-filter>-->
                <div class="tagl-visb-btns">
                    <toggleButton class="mainToggleBtn" [ngClass]="_main ? 'mainToggleBtnOn' : 'mainToggleBtnOff'" (click)="onMainClick()">
                        <div *ngIf="_main">
                            <toggleButton *ngFor="let layer of layers" (click)="onClick($event, layer)" 
                                class="visb-Btn" [ngClass]="on ? 'on' : 'off'">
                                {{layer.name}}
                            </toggleButton>
                        </div>
                    </toggleButton>
                </div>
               </section>
                `
})


export class MapLayerComponent implements OnInit {
    private search = true;
    // private layerFilter = false;
    private _main = false;
    private _test: string = '+'
    @Input() on = false;
    @Input() private layers: LayerModel[];
    @Output() onMainChange = new EventEmitter();
    @Output() onChange = new EventEmitter();

    onClick(ev, layer){
        event.stopPropagation();
        this.onChange.emit(layer);
    }
    onMainClick () {
        event.stopPropagation();
        this._main = !this._main;
    }
    constructor(private layerFilter:LayerFilterComponent) { }

    ngOnInit() { 
    }
    ngOnChanges(changes : SimpleChange){
      
        console.log('this.layers in map-layer:', this.layers);
    }
}
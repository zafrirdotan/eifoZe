import { Component, OnInit, Input, Output, EventEmitter, SimpleChange} from '@angular/core';
import {MapComponent} from '../map-component/map.component';
import {LayerFilterComponent} from '../../layer/layer-filter.component'
import {LayerListComponent} from '../../layer/layer-list.component'
import {FilterByPipe} from '../../shared/pipes/filter-list.pipe';
import {LayerModel} from "../../layer/layer.model";
import {ToggleButton} from './toggleButton';


@Component({
    moduleId: module.id,
    selector: 'mapLayers',
    pipes: [FilterByPipe],
    directives: [LayerFilterComponent, MapLayerComponent, ToggleButton],
    template: `<section class="mapLayers">
                <div class="tagl-visb-btns">
                    <button class="mainToggleBtn" [ngClass]="_main ? 'mainToggleBtnOn' : 'mainToggleBtnOff'" (click)="onMainClick()">
                        <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>
                    </button>

                        <div class="scrollBar" *ngIf="_main" >
                            <toggleButton *ngFor="let layer of layers" (click)="onClick($event, layer)">
                                {{layer.name}}
                            </toggleButton>
                        </div>
                </div>
               </section>
                `
})


export class MapLayerComponent implements OnInit {
    private search = true;
    private _main = false;
    @Input() on = false;
    // private _test: string = '+'
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
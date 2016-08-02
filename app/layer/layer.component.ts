import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LayerService} from './layer.service';
import {LayerModel} from './layer.model';

export interface ILoc {
    label: string;
    lat: number;
    lng: number;
}

@Component({
  moduleId: module.id,
  styleUrls: [`layer.css`],
  // selector: 'monster-list',
  template: `
    <section *ngIf="layer" style="-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;" 
          unselectable="on"
          onselectstart="return false;" 
          onmousedown="return false;">>
      <h2>Layer {{layer.label}}</h2>
    </section>
  `
})
export class LayerComponent implements OnInit {

  private layer : LayerModel;

  constructor(
                private route: ActivatedRoute,
                private _layerService : LayerService
  ) { }

  ngOnInit() {
   this.route.params.subscribe(params => {
     const id = params['id'];
     const prmLayer = this._layerService.get(id);
     prmLayer.then((layer: LayerModel) => {
       this.layer = layer;
     });
   });
  }



}

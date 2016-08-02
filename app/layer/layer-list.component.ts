import { Component, OnInit, ViewChildren } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import {LayerService} from './layer.service';
import {LayerModel} from './layer.model';
import {FilterByPipe} from '../shared/pipes/filter-list.pipe';
import {LayerFilterComponent} from './layer-filter.component';
import {LayerThumbComponent} from './layer-thumb.component';


@Component({
  moduleId: module.id,
  styleUrls: [`layer.css`],
  pipes: [FilterByPipe],
  directives: [LayerFilterComponent, LayerThumbComponent],
  // selector: 'monster-list',
  template: `

  <section>
    <h2> Edit Layers</h2>
    <layer-filter (filterChange)="filter = $event"></layer-filter>
    <a routerLink="/layer/edit" class="btn btn-primary">+ Add Layer</a>
  </section>
  <table  class="table table-hover">
    <tr>
      <th>Name</th>
      <th>Actions</th>
    </tr>
    <tr *ngFor="let layer of layers">
      <td>{{layer.name}}</td>
      <td>
        <button class="btn btn-danger" (click)="removeLayer(layer.id)">Delete</button>
        <a routerLink="/layer/edit/{{layer.id}}" class="btn btn-success">Edit</a>
      </td>
    </tr>
  </table>


  
    <nav class="navbar navbar-default navbar-fixed-bottom">
        <a class="btn btn-default" routerLink="/map">Map</a>
    </nav>

`  
})
export class LayerListComponent implements OnInit {
  // TODO: let the pipe setup the initial filter
  private filter = {byName: '', byPower: ''};
  private layers : LayerModel[] = [];

  constructor(private toastr : ToastsManager, private layerService : LayerService) { }

  ngOnInit() {
    const prmLayers = this.layerService.query();

    prmLayers.then((layers : LayerModel[]) => {
      this.layers = layers;
    });

    prmLayers.catch(err => {
      alert('Sorry,cannot load the layers, try again later');
      console.log('Cought an error in LayerList', err);
    });
  }
  removeLayer(layerId : string) {
    this.layerService.remove(layerId)
      .then((layers : LayerModel[])=>{
        this.layers = layers;
        this.toastr.success('You are awesome!', 'Success!');
      });
  }
}

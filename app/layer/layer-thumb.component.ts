import { Component, OnInit } from '@angular/core';
import {LayerModel} from './layer.model';

@Component({
  moduleId: module.id,
  selector: 'layer-thumb',
  styleUrls: [`layer.css`],
  inputs: ['layer'],
  template: `
          <section>
            <p>{{layer.name}}</p>
            <a routerLink="/layer/{{layer.id}}/{{layer.name}}">
              <img class="imgLayer" [src]="layer.getImgUrl()" />
            </a>
            <h6>locs: {{layer.Locs}}</h6>

          </section>
          `

})
export class LayerThumbComponent implements OnInit {

  private layer : LayerModel;

  constructor() { }

  ngOnInit() { }

}

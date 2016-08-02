import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'layer-filter',
  outputs: ['filterChange'],
  styles: [`section {background-color: #DDD; margin: 2em 0; padding:0.4em 1em 1em; border-radius:0.4em} `],
  template: `
      <section>
        <h3 *ngIf="isAdminMode">Filter</h3>
        <h3 *ngIf="!isAdminMode">Search</h3>
        By Name: <input type="text" [(ngModel)]="filter.byName" (input)="filterChanged()" />

      </section>

  `
})
export class LayerFilterComponent implements OnInit {

  private filterChange = new EventEmitter();
  private isAdminMode = true;

  private filter = {byName: ''};
  constructor() { }

  
  // public get value() : string {
  //   return this.isAdminMode;
  // }
  
  // public set adminMode(bool) {
  //   this.isAdminMode = bool;
  //   console.log("isAdminMode:",this.isAdminMode);
    
  // }
  
  ngOnInit() { }
  filterChanged() {
    this.filterChange.emit(this.filter);
  }

}

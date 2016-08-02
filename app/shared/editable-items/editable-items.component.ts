import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, REACTIVE_FORM_DIRECTIVES, FormControl} from '@angular/forms';
import {MapComponent} from '../map-component/map.component';
@Component({
  moduleId: module.id,
  styleUrls: [],
  selector: 'editable-items',
  directives: [REACTIVE_FORM_DIRECTIVES, MapComponent],
  template: `
    <section>
     <button type="button"  class="btn btn-default" (click)="visibleFlag = !visibleFlag">Add Location</button>
      <div [hidden]="!visibleFlag" >
       <button type="button"  class="btn" (click)="visibleMap = !visibleMap">Use Map</button>
       <map (locAdded)="newLoc = $event"></map>
          <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-control" [(ngModel)]="newLoc.name">
          </div>

          <div class="form-group">
            <label>lat:</label>
            <input type="number" class="form-control"  [(ngModel)]="newLoc.lat">
          </div>

          <div class="form-group">
          <label>lng:</label>

          <input type="number" class="form-control"  [(ngModel)]="newLoc.lng">

          </div>

          <button type="button" class="btn btn-default" (click)="addLoc()">Add</button>
          <button type="button" class="btn btn-info"  (click)="visibleFlag=false" >Cancel</button>
        
      </div>
      <h2> {{itemsLayerName}}</h2>

    
      <table class="table table-hover">
                    <tr>
                        <th>Name</th>
                        <th>Actions</th> 
                    </tr> 
                     <tr *ngFor="let item of items ">
                        <td>{{item.name}}</td>
                        <td>
                            <button class="btn btn-danger" (click)="removeItem(item)">Delete</button>
                        </td>
                    </tr>
      </table>
      
    </section>
  `
})
export class EditableItemsComponent  {
 

@Output() private edit = new EventEmitter();
@Input() private items; 
@Input() private itemsLayerName;
private visibleFlag = false;
private visibleMap = false;
private newLoc = {};
 
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {}

  removeItem(item){
     
      console.log(item);
      
      this.edit.emit({type: 'remove', item})
    }

  addLoc() {
      // a new item
      this.edit.emit({type: 'add', item: this.newLoc});
      this.newLoc = {};
  }
  
   
  

}
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
      <div class="add-loc">
        
        <div class="form-group locs">
          <!--<label>Location name:</label>-->
          <input type="text" class="form-control" [(ngModel)]="newLoc.name" placeholder="Location name">
        </div>

        <div class="form-group locs">
          <!--<label>lat:</label>-->
          <input type="number" class="form-control"  [(ngModel)]="newLoc.lat" placeholder="lat">
        </div>

        <div class="form-group locs">
        <!--<label>lng:</label>-->
        <input type="number" class="form-control"  [(ngModel)]="newLoc.lng" placeholder="lng">

        </div>
        

            <button type="button" class="btn btn-add" (click)="addLoc()">Add</button>
            <button type="button" class="btn btn-cancel"  (click)="visibleFlag=false" >Cancel</button>
      </div>
        <map (locAdded)="newLoc = $event" [options]="mapOptions"></map>
      <h2> {{itemsLayerName}}</h2>

    
      <table class="table table-hover">
                    <tr>
                        <th>Name</th>
                        <th>Actions</th> 
                    </tr> 
                     <tr *ngFor="let item of items ">
                        <td>{{item.name}}</td>
                        <td>
                            <button class="btn-delete" (click)="removeItem(item)">
                              <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </button>
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
private mapOptions = {showMe: true, showLayers:false};
 
  
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
  
  disableMapLayers(){
    // let mapLayer = new MapComponent();
  }
  
   
  

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, REACTIVE_FORM_DIRECTIVES, FormControl} from '@angular/forms';
import {LayerService} from './layer.service';
import {LayerModel} from './layer.model';
import {EditableItemsComponent} from '../shared/editable-items/editable-items.component';

@Component({
  moduleId: module.id,
  // selector: 'monster-edit',
  templateUrl: 'layer-edit.component.html',
  directives: [REACTIVE_FORM_DIRECTIVES, EditableItemsComponent]
})
export class LayerEditComponent implements OnInit {

  private frmLayer: FormGroup;
  private layer: LayerModel = new LayerModel(undefined,'', [], '', false);

  

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private layerService: LayerService) {
      
     }

  ngOnInit() {
    console.log('this.route.params', this.route.params);
    this.prepareForm();
    this.route.params.subscribe(params => {
        const id = params['id'];
        // This means EDIT mode
        if (id) {
          this.layerService.get(id)
            .then((layer) =>{

                this.layer = layer;
                console.log('in edit, ajax returned : ',  this.layer,  this.frmLayer.controls );
                (<FormControl>this.frmLayer.controls['name']).updateValue(layer.name);
            });
        }
      });
  }
  save() {
    this.layer.name = this.frmLayer.controls['name'].value;

    const layerId = (this.layer)?  this.layer.id : undefined;

    console.log('this.layer',this.layer);
    this.layerService.save(this.layer, layerId)
      .then(()=>{
          this.router.navigate(['/layer']);
    
      });

  }

  prepareForm() {
     this.frmLayer = this.formBuilder.group({
      name: ['',
              Validators.compose([Validators.required,
                                  Validators.minLength(3),
                                  Validators.maxLength(100)])]
      // locName: [5, Validators.required]
    });
  }


// TODO: put in service
    editLoc(action){
        console.log('got action', action);
        let editedLocs;
       switch (action.type) {
          case 'remove':
              editedLocs = this.layer.locs.filter(locs => locs.label !== action.item.name )

          break;
          case 'add':
              editedLocs =[...this.layer.locs, action.item]
          break;
    
         default:
           break;
       } 
      this.layer.locs = editedLocs;
      console.log('this.layer.locs', this.layer.locs);
     
    }

}


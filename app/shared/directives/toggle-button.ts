/**
 * Created by ronen on 27/07/2016.
 */

import {Component, Input, Output,EventEmitter} from "@angular/core";


@Component({
    selector: 'toggleButton',
    styles: [`
    .off{
        background-color: whitesmoke;
        color: black;
    }
    .on{
        background-color: blue;
        color: black;
    }
    `],
    template: `
    <button (click)="onClick($event)"
    [ngClass]="on ? 'on' : 'off'">
    
    <ng-content></ng-content>
    </button>
    `


})

export class ToggleButton{
    @Input() on = false;
    @Output() onChange = new EventEmitter();

    onClick(){
     this.on = !this.on;
     this.onChange.emit(this.on);
    }

}
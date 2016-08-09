
import {Component, Input, Output,EventEmitter} from "@angular/core";


@Component({
    selector: 'toggleButton',
    template: `
    <button (click)="onClick($event)" class="visb-Btn"
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
    //  this.onChange.emit(this.on);
    }

}
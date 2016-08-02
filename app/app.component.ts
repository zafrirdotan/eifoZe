import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


import {ChatRoomService} from './chat/chat-room.service';
import {LayerService} from './layer/layer.service';
import {MapComponent} from './shared/map-component/map.component';
import {from} from "rxjs/observable/from";

// import * as io from 'socket.io-client';


@Component({
  selector: 'my-app',
  moduleId: module.id,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ ChatRoomService, LayerService, ToastsManager, {provide: 'io', useValue: io}]
})
export class AppComponent {
    title = 'google map\'s app';
}
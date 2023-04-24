import { Component } from '@angular/core';
import { BroadcastService } from './broadcast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ag-test';

  constructor(private broadcastservice: BroadcastService) {}

  myClickFunction() {
    this.broadcastservice.emitParentEvent(['clicked a button', true]);
  }
}

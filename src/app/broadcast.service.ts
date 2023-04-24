import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BroadcastService {
  constructor() {}


  private childClickedEvent = new BehaviorSubject<[string, boolean]>([
    '',
    false,
  ]);

  emitParentEvent(msg: [string, boolean]) {
    this.childClickedEvent.next(msg);
  }

  // Alternative: make a public member
  //$ suffix (popularized by Cycle.js) is used to indicate that the variable is an Observable. 
  //It could make it to the official style guide too but it's not there yet
  navItem$ = this.childClickedEvent.asObservable();
  parentEventListner() {
    return this.childClickedEvent.asObservable();
  }
}

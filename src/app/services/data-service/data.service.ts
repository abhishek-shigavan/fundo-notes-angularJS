import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private showSideNavbar = new BehaviorSubject(false)
  currentSideNavbarState = this.showSideNavbar.asObservable()

  constructor() { }

  toggleSideNavbar(val: boolean) {
    this.showSideNavbar.next(val)
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private showSideNavbar = new BehaviorSubject(false)
  currentSideNavbarState = this.showSideNavbar.asObservable()
  private selectedRoute = new BehaviorSubject("")
  currentSelectedRoute = this.selectedRoute.asObservable()
  private searchText = new BehaviorSubject("")
  currentSearchText = this.searchText.asObservable()

  constructor() { }

  toggleSideNavbar(val: boolean) {
    this.showSideNavbar.next(val)
  }

  updateCurrentRoute(val: string) {
    this.selectedRoute.next(val)
  }

  updateSearchText(val: string) {
    this.searchText.next(val)
  }

  handleNoteOperations(note: Object, operation: string) {
    console.log(note)  
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data-service/data.service';
import { MENU_ICON, SEARCH_ICON, REFRESH_ICON, LIST_VIEW_ICON, SETTING_ICON, OTHER_MENU_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent implements OnInit, OnDestroy {
  currState!: boolean;
  subscription!: Subscription;
  email = localStorage.getItem('userEmail')
  name = localStorage.getItem('userName')
  avatarName = this.name?.charAt(0).toUpperCase()
  searchText: string = ""

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private data: DataService, public router: Router) {
    iconRegistry.addSvgIconLiteral('menu-icon', sanitizer.bypassSecurityTrustHtml(MENU_ICON));
    iconRegistry.addSvgIconLiteral('search-icon', sanitizer.bypassSecurityTrustHtml(SEARCH_ICON));
    iconRegistry.addSvgIconLiteral('refresh-icon', sanitizer.bypassSecurityTrustHtml(REFRESH_ICON));
    iconRegistry.addSvgIconLiteral('list-view-icon', sanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON));
    iconRegistry.addSvgIconLiteral('setting-icon', sanitizer.bypassSecurityTrustHtml(SETTING_ICON));
    iconRegistry.addSvgIconLiteral('other-menu-icon', sanitizer.bypassSecurityTrustHtml(OTHER_MENU_ICON));
  }

  ngOnInit() {
    this.subscription = this.data.currentSideNavbarState.subscribe(state => this.currState = state)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleSideNavbar = () => {
    this.data.toggleSideNavbar(!this.currState)
  }

  handleLogout() {
    localStorage.clear()
    this.router.navigate(["/login"])
  }

  handleSearchText = () => {
    this.data.updateSearchText(this.searchText)    
  }
}

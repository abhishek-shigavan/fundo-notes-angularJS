import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data-service/data.service';
import { MENU_ICON, SEARCH_ICON, REFRESH_ICON, LIST_VIEW_ICON, SETTING_ICON, OTHER_MENU_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardHeaderComponent implements OnInit, OnDestroy {
  currState!: boolean;
  subscription!: Subscription;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private data: DataService) {
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
}

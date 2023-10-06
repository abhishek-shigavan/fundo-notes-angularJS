import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data-service/data.service';
import { NOTE_ICON, REMINDER_ICON, EDIT_ICON, ARCHIVE_ICON, TRASH_ICON } from 'src/assets/svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit, OnDestroy {
  showSideNavbar!: boolean;
  subscription!: Subscription;
  activeRoute: string = 'notes'

  constructor(private data: DataService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public router: Router) {
     iconRegistry.addSvgIconLiteral("note-icon", sanitizer.bypassSecurityTrustHtml(NOTE_ICON))
     iconRegistry.addSvgIconLiteral("reminder-icon", sanitizer.bypassSecurityTrustHtml(REMINDER_ICON))
     iconRegistry.addSvgIconLiteral("edit-icon", sanitizer.bypassSecurityTrustHtml(EDIT_ICON))
     iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON))
     iconRegistry.addSvgIconLiteral('trash-icon', sanitizer.bypassSecurityTrustHtml(TRASH_ICON))
   }

  ngOnInit() {
    this.subscription = combineLatest(this.data.currentSideNavbarState, this.data.currentSelectedRoute)
    .subscribe(([showSideNavbar, selectedRoute]) => { this.showSideNavbar = showSideNavbar; this.activeRoute = selectedRoute }) 
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleNavigation(routePath: string) {
    this.router.navigate(['/dashboard'+routePath])
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data-service/data.service';
import { NOTE_ICON, REMINDER_ICON, EDIT_ICON, ARCHIVE_ICON, TRASH_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit, OnDestroy {
  showSideNavbar!: boolean;
  subscription!: Subscription;

  constructor(private data: DataService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
     iconRegistry.addSvgIconLiteral("note-icon", sanitizer.bypassSecurityTrustHtml(NOTE_ICON))
     iconRegistry.addSvgIconLiteral("reminder-icon", sanitizer.bypassSecurityTrustHtml(REMINDER_ICON))
     iconRegistry.addSvgIconLiteral("edit-icon", sanitizer.bypassSecurityTrustHtml(EDIT_ICON))
     iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON))
     iconRegistry.addSvgIconLiteral('trash-icon', sanitizer.bypassSecurityTrustHtml(TRASH_ICON))
   }

  ngOnInit() {
    this.subscription = this.data.currentSideNavbarState.subscribe(currState => this.showSideNavbar = currState)
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

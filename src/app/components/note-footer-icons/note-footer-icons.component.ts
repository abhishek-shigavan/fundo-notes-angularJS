import { state } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data-service/data.service';
import { NoteService } from 'src/app/services/note-service/note.service';
import { REMINDER_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, ARCHIVE_ICON, MORE_ICON, DELETE_FOREVER_ICON, RESTORE_ICON, UNARCHIVE_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-note-footer-icons',
  templateUrl: './note-footer-icons.component.html',
  styleUrls: ['./note-footer-icons.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class NoteFooterIconsComponent implements OnInit, OnDestroy {
  @Input() enableStyle!: boolean;
  @Input() noteDetails: any
  iconsContainer: string = ""
  subscription!: Subscription;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private dataService: DataService, private noteService: NoteService) {
    iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));
    iconRegistry.addSvgIconLiteral('collabrator-icon', sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON));
    iconRegistry.addSvgIconLiteral('color-palatte-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON));
    iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON));
    iconRegistry.addSvgIconLiteral('delete-forever-icon', sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON));
    iconRegistry.addSvgIconLiteral('restore-icon', sanitizer.bypassSecurityTrustHtml(RESTORE_ICON));
    iconRegistry.addSvgIconLiteral('unarchive-icon', sanitizer.bypassSecurityTrustHtml(UNARCHIVE_ICON));
  }

  ngOnInit() {
    this.subscription = this.dataService.currentSelectedRoute.subscribe(state => this.iconsContainer = state)
  }
   
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  async handleArchiveOperation() {
    const res = await this.noteService.archiveNote({"noteIdList": [this.noteDetails?.id], "isArchived": true})
    // console.log(res)
    this.dataService.handleNoteOperations(this.noteDetails, "archive")    
  }

  async handleTrashOperation() {
    const res = await this.noteService.trashNote({"noteIdList": [this.noteDetails?.id], "isDeleted": true})
    console.log(res)
  }
}

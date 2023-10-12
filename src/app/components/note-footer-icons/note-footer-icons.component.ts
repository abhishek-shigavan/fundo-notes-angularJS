import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
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
  host: {
    class: 'app-footer-icons-cnt'
  }
})
export class NoteFooterIconsComponent implements OnInit, OnDestroy {
  @Input() enableStyle!: boolean;
  @Input() noteDetails: any;
  @Output() handleNotesOperations = new EventEmitter<Object>();
  iconsContainer: string = '';
  subscription!: Subscription;

  constructor( iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private dataService: DataService, private noteService: NoteService ) {
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
    this.subscription = this.dataService.currentSelectedRoute.subscribe(
      (state) => (this.iconsContainer = state)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async handleIconsClick(operation: any) {
    if (operation == 'archive' || operation == "unarchive") {
      const res = await this.noteService.archiveNote({
        noteIdList: [this.noteDetails?.id],
        isArchived: operation == "archive" ? true : false,
      });
    } else if (operation == "trash" || operation == "restore") {
      const res = await this.noteService.trashNote({
        noteIdList: [this.noteDetails?.id],
        isDeleted: operation == "trash" ? true : false,
      });
    } else {
      const res = await this.noteService.deleteNote({
        noteIdList: [this.noteDetails?.id],
        isDeleted: false
      })
    }

    this.handleNotesOperations.emit({
      operation: operation,
      noteDetails: this.noteDetails,
    });
  }
}

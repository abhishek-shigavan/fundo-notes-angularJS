import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { PIN_ICON, TICK_ICON, BRUSH_ICON, IMG_ICON, UNDO_ICON, REDO_ICON } from 'src/assets/svg-icons';
import { NoteService } from 'src/app/services/note-service/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent {
  expand = false
  title: string = ""
  description: string = ""
  archive: boolean = false
  color: string = "#FFFFFF"
  mode: string = "AddNote"

  @Output() addNoteInNotesList = new EventEmitter<Object>()

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private noteService: NoteService) {
    iconRegistry.addSvgIconLiteral('pin-icon', sanitizer.bypassSecurityTrustHtml(PIN_ICON));
    iconRegistry.addSvgIconLiteral('tick-icon', sanitizer.bypassSecurityTrustHtml(TICK_ICON));
    iconRegistry.addSvgIconLiteral('brush-icon', sanitizer.bypassSecurityTrustHtml(BRUSH_ICON));
    iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
    iconRegistry.addSvgIconLiteral('undo-icon', sanitizer.bypassSecurityTrustHtml(UNDO_ICON));
    iconRegistry.addSvgIconLiteral('redo-icon', sanitizer.bypassSecurityTrustHtml(REDO_ICON));
  }
  
  handleNoteClick = () => {
    this.expand = !this.expand
  }

  adjustTextareaHeight() {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  handleAddNoteFooterOperations(operation: any) {
    if (operation == "archive") {
      this.archive = true
    } else if (operation.includes('#')) {
      this.color = operation
    }
  }

  async handleCloseNote() {
    this.expand = !this.expand

    if(this.title?.length == 0 || this.description?.length == 0) return
    const noteObj = {
      "title" : this.title,
      "description" : this.description,
      "isPined": false,
      "isArchived": this.archive,
      "color": this.color,
      "reminder": "",
    }
    const res = await this.noteService.addNote(noteObj)
    this.addNoteInNotesList.emit(res?.status?.details)
  }
}

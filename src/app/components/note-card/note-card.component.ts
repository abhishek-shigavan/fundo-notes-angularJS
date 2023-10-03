import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { EditNoteModalComponent } from '../edit-note-modal/edit-note-modal.component';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
  host: {
    class: 'note-card-display-cnt'
  },
  // encapsulation: ViewEncapsulation.None,
})
export class NoteCardComponent {
  applyStyle = true
  @Input() notesList!: any;
  @Output() handleNotesOperations = new EventEmitter<Object>()
  constructor(public dialog: MatDialog) {}

  openDialog(noteDetails: Object) {
    const dialogRef = this.dialog.open(EditNoteModalComponent, {data: {...noteDetails}});
    dialogRef.afterClosed().subscribe(result => {
      this.handleNotesOperation({operation: "update", noteDetails: {...result}})
    });
  }

  handleNotesOperation($event: any) {
    this.handleNotesOperations.emit($event)
  }
}

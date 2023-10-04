import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { EditNoteModalComponent } from '../edit-note-modal/edit-note-modal.component';
import { DataService } from 'src/app/services/data-service/data.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
  host: {
    class: 'note-card-display-cnt'
  },
  // encapsulation: ViewEncapsulation.None,
})
export class NoteCardComponent implements OnInit {
  applyStyle = true
  notesContainer: string = '';
  subscribe!: Subscription;
  @Input() notesList!: any;
  @Output() handleNotesOperations = new EventEmitter<Object>()
  constructor(public dialog: MatDialog, public dataService: DataService) {}
  
  ngOnInit() {
    this.subscribe = this.dataService.currentSelectedRoute.subscribe(state => this.notesContainer = state)
  }

  openDialog(noteDetails: Object) {
    if (this.notesContainer == "trash") return
    const dialogRef = this.dialog.open(EditNoteModalComponent, {data: {...noteDetails}});
    dialogRef.afterClosed().subscribe(result => {
      this.handleNotesOperation({operation: "update", noteDetails: {...result}})
    });
  }

  handleNotesOperation($event: any) {
    this.handleNotesOperations.emit($event)
  }
}

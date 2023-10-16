import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
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
  searchString: string = ""
  @Input() notesList!: any
  @Output() handleNotesOperations = new EventEmitter<Object>()
  constructor(public dialog: MatDialog, public dataService: DataService) {}
  
  ngOnInit() {
    this.subscribe = combineLatest(this.dataService.currentSelectedRoute, this.dataService.currentSearchText)
      .subscribe(([selectedRoute, searchText]) => { this.notesContainer = selectedRoute; this.searchString = searchText }) 
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe()
  }

  openDialog(noteDetails: Object) {
    if (this.notesContainer == "trash") return
    const dialogRef = this.dialog.open(EditNoteModalComponent, {data: {...noteDetails}});
    dialogRef.afterClosed().subscribe(result => {
      this.handleNotesOperation({operation: result.operation, noteDetails: {...result.noteData}})
    });
  }

  handleNotesOperation($event: any) {
    this.handleNotesOperations.emit($event)
  }
}

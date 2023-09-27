import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data-service/data.service';
import { NoteService } from 'src/app/services/note-service/note.service';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss'],
  host: {
    class: 'app-notes-cnt',
  },
})
export class NotesContainerComponent implements OnInit{
  notesArray: any = []
  constructor(private noteService: NoteService, private dataService: DataService, private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.noteService.getAllNotes().subscribe(
      (response) => {
        const filteredNotes = response?.data?.data.filter((item: { isArchived: boolean }) => item.isArchived == false).filter((item: { isDeleted: boolean }) => item.isDeleted == false)
        this.notesArray = [...filteredNotes]
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
    this.dataService.updateCurrentRoute(this.route.snapshot?.routeConfig?.path || "")
  }

  addNoteInNotesArray($event: any) {
    this.notesArray = [$event, ...this.notesArray]
  }

  updateNotesArray($event: any) {
    if($event.operation == 'archive' || $event.operation == 'trash') {
      const updatedNotesArray = this.notesArray.filter((item: { id: String }) => item.id != $event.noteDetails?.id)
      this.notesArray = [...updatedNotesArray]
    }
  }
}

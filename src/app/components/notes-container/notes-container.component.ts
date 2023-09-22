import { Component, OnInit } from '@angular/core';
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
  constructor(private noteService: NoteService) { }
  
  ngOnInit() {
    this.noteService.getAllNotes().subscribe(
      (response) => {
         this.notesArray = [...response?.data?.data]
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  addNoteInNotesArray($event: any) {
    this.notesArray = [$event, ...this.notesArray]
  }
}

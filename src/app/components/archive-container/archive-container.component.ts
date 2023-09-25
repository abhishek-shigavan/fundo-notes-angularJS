import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note-service/note.service';

@Component({
  selector: 'app-archive-container',
  templateUrl: './archive-container.component.html',
  styleUrls: ['./archive-container.component.scss'],
  host: {
    class: 'app-archive-notes-cnt'
  }
})
export class ArchiveContainerComponent implements OnInit {
  archiveNotesArray: any = []

  constructor(private noteService: NoteService) {}
  
  ngOnInit() {
    this.noteService.getAllArchiveNotes().subscribe(
      (respose) => {
        this.archiveNotesArray = [...respose.data?.data]
      },
      (error) => {
        console.log(error)
      }
    )
  }
}

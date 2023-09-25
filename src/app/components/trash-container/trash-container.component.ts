import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note-service/note.service';

@Component({
  selector: 'app-trash-container',
  templateUrl: './trash-container.component.html',
  styleUrls: ['./trash-container.component.scss'],
  host: {
    class: 'app-trash-cnt'
  }
})
export class TrashContainerComponent implements OnInit {
  trashNotesArray: any = []
  
  constructor(public noteService: NoteService) {}
  ngOnInit() {
    this.noteService.getAllTrashNotes().subscribe(
      (response) => {
        this.trashNotesArray = [...response.data?.data]
      },
      (err) => {
        console.log(err)
      }
    )
  }
}

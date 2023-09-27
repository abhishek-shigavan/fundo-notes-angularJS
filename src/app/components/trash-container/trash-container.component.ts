import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data-service/data.service';
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
  
  constructor(public noteService: NoteService, public route: ActivatedRoute, public dataService: DataService) {}
  
  ngOnInit() {
    this.noteService.getAllTrashNotes().subscribe(
      (response) => {
        this.trashNotesArray = [...response.data?.data]
      },
      (err) => {
        console.log(err)
      }
    )
    this.dataService.updateCurrentRoute(this.route.snapshot?.routeConfig?.path || "")
  }

  updateTrashNotesArray($event: any) {
    const updatedTrashNotes = this.trashNotesArray.filter((item: {id: string}) => item.id != $event.noteDetails.id)
    this.trashNotesArray = [...updatedTrashNotes]
  }
}

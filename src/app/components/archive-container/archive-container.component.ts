import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data-service/data.service';
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
  subscription!: Subscription

  constructor(private noteService: NoteService, public route: ActivatedRoute, private dataService: DataService) {}
  
  ngOnInit() {
    this.noteService.getAllArchiveNotes().subscribe(
      (respose) => {
        const filterArchiveNotes = respose?.data?.data.filter((item : { isDeleted : boolean }) => item.isDeleted == false)
        this.archiveNotesArray = [...filterArchiveNotes]
      },
      (error) => {
        console.log(error)
      }
    )
    this.dataService.updateCurrentRoute(this.route.snapshot?.routeConfig?.path || "")
  }

  updateArchiveNotesArray($event: any) {
    let updatedArchiveNotes = []
    if($event.operation == 'unarchive' || $event.operation == 'trash') {
      updatedArchiveNotes = this.archiveNotesArray.filter((item : { id : string }) => item.id != $event.noteDetails.id)
    } else if($event.operation == "update") {
      updatedArchiveNotes = this.archiveNotesArray.map((item: { id: string }) => {if(item.id === $event.noteDetails?.id) { return item = {...$event.noteDetails}} return item})
    }  
    this.archiveNotesArray = [...updatedArchiveNotes]
  }
}

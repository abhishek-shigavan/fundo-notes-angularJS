import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpService: HttpService) { }

  async addNote(data: {}): Promise<any> {
    try {
      return this.httpService.addNoteCall("/notes/addNotes", data)
    } catch (error) {
      return error
    }
  }

  getAllNotes(): Observable<any> {
    return this.httpService.getAllNotesCall("/notes/getNotesList")
  }
}

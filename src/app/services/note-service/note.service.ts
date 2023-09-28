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
      return await this.httpService.addNoteCall("/notes/addNotes", data)
    } catch (error) {
      return error
    }
  }

  getAllNotes(): Observable<any> {
    return this.httpService.getNotesCall("/notes/getNotesList")
  }

  getAllArchiveNotes(): Observable<any> {
    return this.httpService.getNotesCall("/notes/getArchiveNotesList")
  }

  getAllTrashNotes(): Observable<any> {
    return this.httpService.getNotesCall("/notes/getTrashNotesList")
  }

  async archiveNote(data: {}): Promise<any> {
    return await this.httpService.archiveNoteCall("/notes/archiveNotes", data)
  }

  async trashNote(data: {}): Promise<any> {
    return await this.httpService.trashNoteCall("/notes/trashNotes", data)
  }

  async deleteNote(data: {}): Promise<any> {
    return await this.httpService.deleteNoteCall("/notes/deleteForeverNotes", data)
  }
}

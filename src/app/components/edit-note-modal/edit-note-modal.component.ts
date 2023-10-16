import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteService } from 'src/app/services/note-service/note.service';

@Component({
  selector: 'app-edit-note-modal',
  templateUrl: './edit-note-modal.component.html',
  styleUrls: ['./edit-note-modal.component.scss']
})
export class EditNoteModalComponent implements OnInit {
  oldTitle: string = ""
  oldDescription: string = ""
  oldColor: string = ""
  oldArchive: boolean = false
  mode: string = "EditNote"

  constructor(public dialogRef: MatDialogRef<EditNoteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, description: string, id: string, color: string, isArchive: boolean },
    public noteService: NoteService) { 
      this.oldTitle = data.title
      this.oldDescription = data.description
      this.oldColor = data.color
      this.oldArchive = data.isArchive
    }

  ngOnInit(): void {
    this.adjustTextareaHeight()
  }

  adjustTextareaHeight() {
    const textarea = document.querySelector('textarea');
    
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.rows = 4
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  async handleEditNoteFooterOperations(operation: any) {
    let res
    if (operation == "archive" || operation == 'unarchive') {
      res = await this.noteService.archiveNote({
        noteIdList: [this.data.id],
        isArchived: operation == "archive" ? true : false,
      });
      this.data.isArchive = operation == "archive" ? true : false
    } else if (operation.includes('#')) {
      res = await this.noteService.colorChange({
        noteIdList: [this.data?.id],
        color: operation
      })
      this.data.color = operation
    }
  }

  async handleCloseEditNote() {
    let operation = "update"
    if (this.data.title !== this.oldTitle || this.data.description !== this.oldDescription) {
      const res = await this.noteService.editNote({...this.data, noteId: this.data?.id})
    }
    if(this.data.isArchive !== this.oldArchive) operation = this.data.isArchive ? "archive" : "unarchive"
    
    this.dialogRef.close({operation: operation, noteData: this.data});
  }
}

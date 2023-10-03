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

  constructor(public dialogRef: MatDialogRef<EditNoteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, description: string, id: string },
    public noteService: NoteService) { 
      this.oldTitle = data.title
      this.oldDescription = data.description
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

  async handleCloseEditNote() {
    if (this.data.title !== this.oldTitle || this.data.description !== this.oldDescription) {
      const res = await this.noteService.editNote({...this.data, noteId: this.data?.id})
    }
    this.dialogRef.close(this.data);
  }
}

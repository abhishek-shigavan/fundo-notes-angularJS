import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
  host: {
    class: 'note-card-display-cnt'
  },
  // encapsulation: ViewEncapsulation.None,
})
export class NoteCardComponent {
  applyStyle = true
  @Input() notesList!: any;
  @Output() handleNotesOperations = new EventEmitter<Object>()
  constructor() { }

  handleNotesOperation($event: any) {
    this.handleNotesOperations.emit($event)
  }
}

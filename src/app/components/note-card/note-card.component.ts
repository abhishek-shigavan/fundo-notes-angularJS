import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
  host: {
    class: 'note-card-display-cnt'
  }
})
export class NoteCardComponent {
  @Input() notesList!: any;
  constructor() { }

}

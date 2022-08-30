import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from './note';

@Component({
  selector: 'app-note',
  template: `
    <mat-card class="item" *ngIf="note" (dblclick)="edit.emit(note)">
      <mat-card-title>{{ note.title }}</mat-card-title>
      <mat-card-content>
        {{ note.description }}
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    '.item { margin-top: 1rem; }'
  ]
})
export class NoteComponent implements OnInit {
  @Input() note: Note | null = null;
  @Output() edit = new EventEmitter<Note>();

  constructor() { }

  ngOnInit(): void {
  }

}

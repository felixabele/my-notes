import { NotesService } from './../notes.service';
import { Widget, Widgets } from './../widget/widget';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from './note';

@Component({
  selector: 'app-note',
  template: `
    <mat-card class="item" *ngIf="note" (dblclick)="edit.emit(note)">
      <mat-card-title>
        {{ note.title }}
        <app-note-menu
          class="item__menu"
          (addWidget)="onAddWidget($event)"
        ></app-note-menu>
      </mat-card-title>
      <mat-card-content>
        {{ note.description }}

        <app-widget *ngFor="let widget of note.widgets" [widget]="widget" [note]="note">
        </app-widget>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    '.item { margin-top: 1rem; }',
    '.item__menu { float: right }'
  ]
})
export class NoteComponent {
  @Input() note: Note | null = null;
  @Output() edit = new EventEmitter<Note>();

  constructor(private notesService: NotesService) {}

  onAddWidget(widget: Widget): void {
    if (!this.note || !this.note.id) {
      return;
    }
    const widgets: Widgets | [] = this.note.widgets || [];
    widgets.push(widget);
    this.notesService.updateWidgets(this.note.id, widgets);
  }
}

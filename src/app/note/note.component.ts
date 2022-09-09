import { NotesService } from './../notes.service';
import { Widget, Widgets } from './../widget/widget';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note, ExistingNote } from './note';

@Component({
  selector: 'app-note',
  template: `
    <mat-card
      class="item"
      *ngIf="note"
      [ngClass]="{ visible: note.visible, hidden: !note.visible }"
    >
      <mat-card-title class="note-title">
        <span>{{ note.title }}</span>
        <span class="note-title__spacer"></span>
        <app-note-menu
          class="item__menu"
          (addWidget)="onAddWidget($event)"
          (edit)="edit.emit(note)"
        ></app-note-menu>
        <a (click)="onToggleVisibility()">
          <mat-icon class="icon-visible">visibility</mat-icon>
          <mat-icon class="icon-hidden">visibility_off</mat-icon>
        </a>
      </mat-card-title>
      <mat-card-content>
        {{ note.description }}
        <app-widget *ngFor="let widget of note.widgets" [widget]="widget" [note]="note">
        </app-widget>
      </mat-card-content>
    </mat-card>
    <br />
  `,
  styles: [
    '.note-title { display: flex; }',
    '.note-title__spacer { flex: 1 1 auto; }',
    '.visible .icon-hidden { display: none }',
    '.visible .icon-visible { display: inline }',
    '.hidden .icon-hidden { display: inline }',
    '.hidden .icon-visible { display: none }',
    '.hidden mat-card-content { display: none }',
    'a { cursor: pointer; }',
    '.mat-card-title { margin-bottom: 0 }',
  ]
})
export class NoteComponent {
  @Input() note!: ExistingNote;
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

  onToggleVisibility(): void {
    const { id, title, description, visible } = this.note;
    this.notesService.updateNote(id, title, description, !visible);
  }
}

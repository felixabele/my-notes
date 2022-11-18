import { v4 as uuidv4 } from 'uuid';
import { Component, EventEmitter, Output } from '@angular/core';
import { Checklist, ChecklistItem, Link, RichText, Widget, WidgetTypes } from '../widget/widget';

@Component({
  selector: 'app-note-menu',
  template: `
    <a [matMenuTriggerFor]="menu">
      <mat-icon>more_vert</mat-icon>
    </a>
    <mat-menu #menu="matMenu">
      <button (click)="edit.emit()" mat-menu-item>
        <mat-icon>edit</mat-icon>
        <span>Edit</span>
      </button>
      <button (click)="onAddChecklist()" mat-menu-item>
        <mat-icon>check-box</mat-icon>
        <span>Add Checklist</span>
      </button>
      <button (click)="onAddRichText()" mat-menu-item>
        <mat-icon>edit_note</mat-icon>
        <span>Add Text</span>
      </button>
      <button (click)="onAddLink()" mat-menu-item>
        <mat-icon>link</mat-icon>
        <span>Add Link</span>
      </button>
    </mat-menu>
  `,
  styles: [
    'a { cursor: pointer; margin-right: 1rem; }',
  ]
})
export class NoteMenuComponent {
  @Output() addWidget = new EventEmitter<Widget>();
  @Output() edit = new EventEmitter<Checklist>();

  onAddChecklist(): void {
    const sampleChecklistItem: ChecklistItem = {
      id: uuidv4(),
      title: 'do it',
      done: false,
    };
    const sampleChecklist: Checklist = {
      id: uuidv4(),
      type: WidgetTypes.CHECKLIST,
      items: [sampleChecklistItem],
    };

    this.addWidget.emit(sampleChecklist);
  }

  onAddRichText(): void {
    const sampleRichText: RichText = {
      id: uuidv4(),
      type: WidgetTypes.RICH_TEXT,
      html: '<p>Hello world!</p>',
    };

    this.addWidget.emit(sampleRichText);
  }

    onAddLink(): void {
    const sampleLink: Link = {
      id: uuidv4(),
      type: WidgetTypes.LINK,
      title: '',
      url: '',
    };

    this.addWidget.emit(sampleLink);
  }
}

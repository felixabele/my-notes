import { v4 as uuidv4 } from 'uuid';
import { Component, EventEmitter, Output } from '@angular/core';
import { Checklist, ChecklistItem } from '../widget/widget';

@Component({
  selector: 'app-note-menu',
  template: `
    <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
      <mat-icon>more_vert</mat-icon>
    </button>
    <mat-menu #menu="matMenu">
      <button (click)="edit.emit()" mat-menu-item>
        <mat-icon>edit</mat-icon>
        <span>Edit</span>
      </button>
      <button (click)="onAddChecklist()" mat-menu-item>
        <mat-icon>check-box</mat-icon>
        <span>Add Checklist</span>
      </button>
    </mat-menu>
  `,
  styles: [
  ]
})
export class NoteMenuComponent {
  @Output() addWidget = new EventEmitter<Checklist>();
  @Output() edit = new EventEmitter<Checklist>();

  onAddChecklist(): void {
    const sampleChecklistItem: ChecklistItem = {
      id: uuidv4(),
      title: 'do it',
      done: false,
    };
    const sampleChecklist: Checklist = {
      id: uuidv4(),
      type: 'checklist',
      items: [sampleChecklistItem],
    };

    this.addWidget.emit(sampleChecklist);
  }
}

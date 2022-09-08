import { Checklist, ChecklistItem } from './../widget';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { uuidv4 } from '@firebase/util';

@Component({
  selector: 'app-checklist',
  template: `
    <div *ngFor="let item of checklist.items">
      <app-checkbox
        [item]="item"
        (update)="onUpdateChecklist($event)"
        (delete)="onDeleteChecklistItem($event)"
      ></app-checkbox>
    </div>

    <div class="buttons">
      <button (click)="onAdd()" mat-button mat-stroked-button>
        <mat-icon>add</mat-icon>
        Add Item
      </button>

      <button (click)="onDeleteChecklist()" mat-button mat-stroked-button>
        <mat-icon>delete</mat-icon>
        Delete List
      </button>
    </div>
  `,
  styles: [
    '.buttons { text-align: right; }',
    '.buttons button { margin-left: 1rem; }',
  ],
})
export class ChecklistComponent {
  @Input() checklist!: Checklist;
  @Output() updateChecklist = new EventEmitter<Checklist>();
  @Output() deleteChecklist = new EventEmitter<Checklist>();

  onUpdateChecklist(checklistItem: ChecklistItem): void {
    const updatedChecklistItems:ChecklistItem[] = this.checklist.items.map((item) => (
      item.id === checklistItem.id ? checklistItem : item
    ));

    this.updateChecklist.emit({ ...this.checklist, items: updatedChecklistItems })
  }

  onDeleteChecklist(): void {
    this.deleteChecklist.emit(this.checklist);
  }

  onDeleteChecklistItem(checklistItem: ChecklistItem): void {
    const updatedChecklistItems: ChecklistItem[] = this.checklist.items.filter((item) => (
      item.id !== checklistItem.id
    ));

    this.updateChecklist.emit({ ...this.checklist, items: updatedChecklistItems })
  }

  onAdd(): void {
    const newChecklistItem: ChecklistItem = {
      id: uuidv4(),
      title: 'New todo',
      done: false,
    };
    this.checklist.items.push(newChecklistItem);
    this.updateChecklist.emit(this.checklist);
  }
}


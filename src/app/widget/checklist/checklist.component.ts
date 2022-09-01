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
    <button (click)="onAdd()" mat-icon-button>
      <mat-icon>add</mat-icon>
      Add Item
    </button>
  `,
})
export class ChecklistComponent {
  @Input() checklist!: Checklist;
  @Output() updateChecklist = new EventEmitter<Checklist>();

  onUpdateChecklist(checklistItem: ChecklistItem): void {
    const updatedChecklistItems:ChecklistItem[] = this.checklist.items.map((item) => (
      item.id === checklistItem.id ? checklistItem : item
    ));

    this.updateChecklist.emit({ ...this.checklist, items: updatedChecklistItems })
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


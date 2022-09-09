import { Checklist, ChecklistItem } from './../widget';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { uuidv4 } from '@firebase/util';

@Component({
  selector: 'app-checklist',
  template: `
    <div *ngFor="let item of pendingItems()">
      <app-checkbox
        [item]="item"
        (update)="onUpdateChecklist($event)"
        (delete)="onDeleteChecklistItem($event)"
        (keydown.enter)="onAdd()"
      ></app-checkbox>
    </div>

    <div *ngFor="let item of doneItems()" class="done-items-list">
      <app-checkbox
        [item]="item"
        (update)="onUpdateChecklist($event)"
        (delete)="onDeleteChecklistItem($event)"
      ></app-checkbox>
    </div>

    <div class="buttons">
      <app-icon-link (click)="onAdd()" icon="add">
        Add Item
      </app-icon-link>

      <app-icon-link (click)="onDeleteChecklist()" icon="delete">
        Delete List
      </app-icon-link>
    </div>
  `,
  styles: [
    '.buttons { display: flex; justify-content: flex-end; margin-top: 1rem; }',
    '.buttons app-icon-link { margin-left: 1rem; }',
  ],
})
export class ChecklistComponent {
  @Input() checklist!: Checklist;
  @Output() updateChecklist = new EventEmitter<Checklist>();
  @Output() deleteChecklist = new EventEmitter<Checklist>();

  doneItems(): ChecklistItem[] {
    return this.checklist.items.filter(({ done }) => done);
  }

  pendingItems(): ChecklistItem[] {
    return this.checklist.items.filter(({ done }) => !done);
  }

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


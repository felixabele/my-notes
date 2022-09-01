import { Checklist, ChecklistItem } from './../widget';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checklist',
  template: `
    <div *ngFor="let item of checklist.items">
      <app-checkbox [item]="item" (update)="onUpdateChecklist($event)"></app-checkbox>
    </div>
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
}

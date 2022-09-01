import { ChecklistItem } from './../widget';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  template: `
    <div class="checklist-item">
      <mat-checkbox [(ngModel)]="done" (change)="onChange()">
        {{item.title}}
      </mat-checkbox>
      <button (click)="onDelete()" mat-icon-button class="checklist-item__delete-button">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  `,
  styles: [
    '.checklist-item__delete-button { float: right; display: none }',
    '.checklist-item:hover > .checklist-item__delete-button { display: block }'
  ]
})
export class CheckboxComponent implements OnInit {
  @Input() item!: ChecklistItem;
  @Output() update = new EventEmitter<ChecklistItem>();
  @Output() delete = new EventEmitter<ChecklistItem>();
  done: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.done = !!this.item?.done;
  }

  onChange(): void {
    this.update.emit({ ...this.item, done: this.done });
  }

  onDelete(): void {
    this.delete.emit(this.item);
  }
}

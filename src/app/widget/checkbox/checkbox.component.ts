import { ChecklistItem } from './../widget';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  template: `
    <div class="checklist-item" [ngClass]="{ 'checklist-item__done': item.done }">
      <span>
        <mat-checkbox [(ngModel)]="done" (change)="onChange()"></mat-checkbox>
        <input type="text" [(ngModel)]="title" class="title-input" (blur)="onStopEditing()" />
      </span>
      <mat-icon (click)="onDelete()" class="checklist-item__delete-button">close</mat-icon>
    </div>
  `,
  styles: [
    '.checklist-item { display: flex; justify-content: space-between; }',
    '.checklist-item:hover input { font-weight: bold; }',
    '.checklist-item__done input { text-decoration: line-through; color: grey; }',
    '.mat-checkbox { margin-right: 1rem; }',
    '.mat-icon { font-size: 18px; line-height: 18px; cursor: pointer; }',
    '.title-input { border: 0; outline: none }',
  ]
})
export class CheckboxComponent implements OnInit {
  @Input() item!: ChecklistItem;
  @Output() update = new EventEmitter<ChecklistItem>();
  @Output() delete = new EventEmitter<ChecklistItem>();

  done: boolean = false;
  title: string = '';
  origTitle: string = '';

  constructor() { }

  ngOnInit(): void {
    this.done = !!this.item.done;
    this.title = this.item.title;
    this.origTitle = this.item.title;
  }

  onChange(): void {
    this.update.emit({ ...this.item, done: this.done });
  }

  onDelete(): void {
    this.delete.emit(this.item);
  }

  onStopEditing(): void {
    if (this.origTitle !== this.title) {
      this.update.emit({ ...this.item, title: this.title });
    }
  }
}

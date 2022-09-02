import { ChecklistItem } from './../widget';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  template: `
    <div class="checklist-item" #checklistItem>
      <mat-checkbox [(ngModel)]="done" (change)="onChange()">
      </mat-checkbox>
      <input type="text" [(ngModel)]="title" class="title-input" (blur)="onStopEditing()" />
      <button (click)="onDelete()" mat-icon-button class="checklist-item__delete-button">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  `,
  styles: [
    '.checklist-item__delete-button { float: right; display: none }',
    '.checklist-item:hover > .checklist-item__delete-button { display: block }',
    '.mat-checkbox { margin-right: 1rem; }',
    '.title-input { border: 0; outline: none }',
  ]
})
export class CheckboxComponent implements OnInit {
  @Input() item!: ChecklistItem;
  @Output() update = new EventEmitter<ChecklistItem>();
  @Output() delete = new EventEmitter<ChecklistItem>();
  @ViewChild('titleInput') titleInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('checklistItem') checklistItem: ElementRef<HTMLInputElement> | undefined;

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

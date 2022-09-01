import { ChecklistItem } from './../widget';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  template: `
    <mat-checkbox [(ngModel)]="done" (change)="onChange()">
      {{item.title}}
    </mat-checkbox>
  `,
  styles: [
  ]
})
export class CheckboxComponent implements OnInit {
  @Input() item!: ChecklistItem;
  @Output() update = new EventEmitter<ChecklistItem>();
  done: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.done = !!this.item?.done;
  }

  onChange(): void {
    this.update.emit({ ...this.item, done: this.done });
  }
}

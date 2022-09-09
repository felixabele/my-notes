import { Component, Input } from '@angular/core';
import { ExistingNote } from './../../note/note';
import { Widget, Widgets, WidgetTypes } from './../widget';
import { NotesService } from './../../notes.service';

@Component({
  selector: 'app-widget',
  template: `
    <div>
      <mat-divider></mat-divider>
      <app-checklist
        *ngIf="widget.type == WidgetTypes.CHECKLIST"
        [checklist]="widget"
        (updateChecklist)="onUpdateWidget($event)"
        (deleteChecklist)="onDeleteWidget($event)"
      ></app-checklist>

      <app-rich-text
        *ngIf="widget.type == WidgetTypes.RICH_TEXT"
        [richText]="widget"
        (updateRichText)="onUpdateWidget($event)"
        (deleteRichText)="onDeleteWidget($event)"
      ></app-rich-text>
    </div>
  `,
  styles: [
    '.mat-divider { margin: 1rem 0 }',
  ],
})
export class WidgetComponent {
  @Input() widget!: Widget;
  @Input() note!: ExistingNote;
  WidgetTypes = WidgetTypes;

  constructor(private notesService: NotesService) { }

  onUpdateWidget(updatedWidget: Widget): void {
    const widgets: Widgets | [] = this.note.widgets || [];
    const updatedWidgets: Widgets = widgets.map((widget) => (
      widget.id === updatedWidget.id ? updatedWidget : widget
    ));
    this.notesService.updateWidgets(this.note.id, updatedWidgets);
  }

  onDeleteWidget(deleteWidget: Widget): void {
    const widgets: Widgets | [] = this.note.widgets || [];
    const updatedWidgets: Widgets = widgets.filter((widget) => (
      widget.id !== deleteWidget.id
    ));
    this.notesService.updateWidgets(this.note.id, updatedWidgets);
  }
}

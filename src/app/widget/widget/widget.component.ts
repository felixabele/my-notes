import { Component, Input } from '@angular/core';
import { ExistingNote } from './../../note/note';
import { Widget, Widgets } from './../widget';
import { NotesService } from './../../notes.service';

@Component({
  selector: 'app-widget',
  template: `
    <div [ngSwitch]="widget.type">
      <app-checklist
        *ngSwitchCase="'checklist'"
        [checklist]="widget"
        (updateChecklist)="onUpdateWidget($event)"
        (deleteChecklist)="onDeleteWidget($event)"
      ></app-checklist>
    </div>
  `,
})
export class WidgetComponent {
  @Input() widget!: Widget;
  @Input() note!: ExistingNote;

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

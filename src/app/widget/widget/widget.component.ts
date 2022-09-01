import { Component, Input } from '@angular/core';
import { Note } from './../../note/note';
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
      ></app-checklist>
    </div>
  `,
})
export class WidgetComponent {
  @Input() widget!: Widget;
  @Input() note!: Note;

  constructor(private notesService: NotesService) { }

  onUpdateWidget(updatedWidget: Widget): void {
    if (!this.note.id) {
      return;
    }

    const widgets: Widgets | [] = this.note.widgets || [];
    const updatedWidgets: Widgets = widgets.map((widget) => (
      widget.id === updatedWidget.id ? updatedWidget : widget
    ));
    this.notesService.updateWidgets(this.note.id, updatedWidgets);
  }
}

import { RichText } from './../widget';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-rich-text',
  template: `
    <div class="richt-text-widget" *ngIf="editor">
      <form [formGroup]="form" *ngIf="active">
        <ngx-editor-menu
         [editor]="editor"
         [toolbar] = "toolbar"
        ></ngx-editor-menu>
        <ngx-editor
          [editor]="editor"
          (focusOut)="deactivateEditor()"
          [ngModel]="html"
          formControlName="editorContent"
        ></ngx-editor>
      </form>

      <div
        *ngIf="!active"
        (click)="activateEditor()"
        [innerHTML]="html | safeHtml"
      >
      </div>

      <div class="buttons">
        <app-icon-link (click)="onDeleteRichText()" icon="delete">
          Delete Rich-Text
        </app-icon-link>
      </div>
    </div>
  `,
  styles: [
    '.buttons { display: flex; justify-content: flex-end; margin-top: 1rem; }',
  ],
})
export class RichTextComponent implements OnInit, OnDestroy {
  @Input() richText!: RichText;
  @Output() updateRichText = new EventEmitter<RichText>();
  @Output() deleteRichText = new EventEmitter<RichText>();
  active: boolean = false;
  editor: Editor | null = null;
  html: string = '';

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['text_color'],
    ['horizontal_rule', 'format_clear'],
  ];

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  ngOnInit(): void {
    this.editor = new Editor();
    this.html = this.richText.html;
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  activateEditor(): void {
    this.active = true;

    setTimeout(() => {
      this.editor?.commands
        .focus()
        .exec();
    })
  }

  onDeleteRichText(): void {
    this.deleteRichText.emit(this.richText);
  }

  deactivateEditor(): void {
    this.active = false;
    this.html = this.form.value.editorContent || '';

    this.updateRichText.emit({
      ...this.richText,
      html: this.html,
    });
  }
}

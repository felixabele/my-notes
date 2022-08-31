import { ExistingNote } from './../note/note';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note } from '../note/note';

export interface NoteDialogData {
  note: Partial<Note>;
  action: 'new' | 'edit';
}

export interface NoteDialogResult {
  note: ExistingNote;
  delete?: boolean;
}

@Component({
  selector: 'app-note-dialog',
  template: `
    <mat-form-field>
      <mat-label>Title</mat-label>
      <input matInput cdkFocusInitial [(ngModel)]="data.note.title" />
    </mat-form-field>

    <mat-form-field>
      <mat-label>Description</mat-label>
      <textarea matInput [(ngModel)]="data.note.description"></textarea>
    </mat-form-field>

    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="{ note: data.note }">OK</button>
      <button mat-button (click)="cancel()">Cancel</button>
      <button
        *ngIf="data.action === 'edit'"
        mat-fab
        color="primary"
        aria-label="Delete"
        [mat-dialog-close]="{ task: data.note, delete: true }">
        <mat-icon>delete</mat-icon>
      </button>
    </div>
  `,
  styles: [
  ]
})
export class NoteDialogComponent {
  backupNote: Partial<Note> = { ...this.data.note };

  constructor(
    public dialogRef: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NoteDialogData
  ) { }

  cancel(): void {
    this.data.note.title = this.backupNote.title;
    this.data.note.description = this.backupNote.description;
    this.dialogRef.close(this.data);
  }
}

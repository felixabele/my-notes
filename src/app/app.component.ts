import { Component } from '@angular/core';
import { Note } from './note/note';
import { MatDialog } from '@angular/material/dialog';
import { NoteDialogComponent, NoteDialogResult } from './note-dialog/note-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  notes: Note[] = [
    {
      title: 'First note',
      description: 'This is my first note',
    },
    {
      title: 'Second note',
      description: 'This is my second note',
    }
  ];

  constructor(private dialog: MatDialog) { }

  newNote(): void {
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: '270px',
      data: {
        note: {},
        action: 'new',
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: NoteDialogResult | undefined | null) => {
        if (!result) {
          return;
        }
        this.notes.push(result.note);
      });
  }

  editNote(note: Note): void {
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: '270px',
      data: {
        note,
        action: 'edit',
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: NoteDialogResult | undefined) => {
        if (!result) {
          return;
        }
        const noteIndex = this.notes.indexOf(note);
        if (result.delete) {
          this.notes.splice(noteIndex, 1);
        } else {
          this.notes[noteIndex] = note;
        }
      });
  }
}

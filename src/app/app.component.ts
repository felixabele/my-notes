import { NotesService } from './notes.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentData, QuerySnapshot } from '@angular/fire/firestore';

import { Note, ExistingNote } from './note/note';
import {
  NoteDialogComponent,
  NoteDialogResult,
} from './note-dialog/note-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  notes: Note[] | any = [];

  constructor(private dialog: MatDialog, private notesService: NotesService) {}

  ngOnInit(): void {
    this.get();
    this.notesService.obsr_UpdatedSnapshot.subscribe((snapshot) => {
      this.updateNoteCollection(snapshot);
    });
  }

  async get() {
    const snapshot = await this.notesService.getNotes();
    this.updateNoteCollection(snapshot);
  }

  updateNoteCollection(snapshot: QuerySnapshot<DocumentData>) {
    this.notes = [];
    snapshot.docs.forEach((note) => {
      this.notes.push({ ...note.data(), id: note.id });
    });
  }

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
        if (!result || !result.note?.title) {
          return;
        }
        const note: Note = result.note;
        this.notesService.addNote(note.title, note.description);
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
        const note: ExistingNote = result.note;
        if (result.delete) {
          this.notesService.deleteNote(note.id);
        } else {
          this.notesService.updateNote(note.id, note.title, note.description);
        }
      });
  }
}

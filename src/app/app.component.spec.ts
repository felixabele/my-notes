import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';

import { NoteComponent } from './note/note.component';
import { NoteDialogComponent } from './note-dialog/note-dialog.component';
import { NoteMenuComponent } from './note-menu/note-menu.component';
import { ChecklistComponent } from './widget/checklist/checklist.component';
import { WidgetComponent } from './widget/widget/widget.component';
import { CheckboxComponent } from './widget/checkbox/checkbox.component';
import { RichTextComponent } from './widget/rich-text/rich-text.component';
import { IconLinkComponent } from './icon-link/icon-link.component';
import { AppComponent } from './app.component';
import { Note } from './note/note';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NoteComponent,
        NoteDialogComponent,
        NoteMenuComponent,
        ChecklistComponent,
        WidgetComponent,
        CheckboxComponent,
        RichTextComponent,
        IconLinkComponent,
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatMenuModule,
        MatCheckboxModule,
        MatDividerModule,
      ],
    }).compileComponents();
  });

  const sampleNote: Note = {
    id: 'test-ID',
    title: 'First sample note',
    description: 'My sample description',
    visible: true,
    widgets: [],
  };

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should render a note's title`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   fixture.detectChanges();
  //   app.notes = [sampleNote];
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.mat-card-title')?.textContent).toContain(sampleNote.title);
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('my-notes app is running!');
  // });
});

import { NgModule } from '@angular/core';
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
import { NgxEditorModule } from 'ngx-editor';

import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';
import { NoteDialogComponent } from './note-dialog/note-dialog.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { NoteMenuComponent } from './note-menu/note-menu.component';
import { ChecklistComponent } from './widget/checklist/checklist.component';
import { WidgetComponent } from './widget/widget/widget.component';
import { CheckboxComponent } from './widget/checkbox/checkbox.component';
import { RichTextComponent } from './widget/rich-text/rich-text.component';
import { IconLinkComponent } from './icon-link/icon-link.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { LinkComponent } from './widget/link/link.component';

@NgModule({
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
    SafeHtmlPipe,
    LinkComponent,
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
    NgxEditorModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

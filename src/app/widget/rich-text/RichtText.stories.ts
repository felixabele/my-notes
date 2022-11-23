// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RichText, WidgetTypes } from '../widget';
import { RichTextComponent } from './rich-text.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SafeHtmlPipe } from '../../../app/safe-html.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxEditorModule } from 'ngx-editor';
import { AppComponent } from 'src/app/app.component';
import { IconLinkComponent } from 'src/app/icon-link/icon-link.component';
import { NoteDialogComponent } from 'src/app/note-dialog/note-dialog.component';
import { NoteMenuComponent } from 'src/app/note-menu/note-menu.component';
import { NoteComponent } from 'src/app/note/note.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { ChecklistComponent } from '../checklist/checklist.component';
import { LinkComponent } from '../link/link.component';
import { WidgetComponent } from '../widget/widget.component';

export default {
  title: 'Widgets/RichText',
  component: RichTextComponent,
  decorators: [
    moduleMetadata({
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
      ],
    }),
  ],

  argTypes: {
    RichText: {
      name: 'RichText',
      description: 'Representation of the RichText',
    },
  },
} as Meta;

const Template: Story<RichTextComponent> = (args: RichTextComponent) => ({
  props: {
    args,
    html,
    richText: sampleRichText
  },
});

const html = `
  <h2>Headline</h2>
  <p>Paragraph and <s>no code</s></p>
`;

const sampleRichText: RichText = {
  id: 'sampleID',
  type: WidgetTypes.RICH_TEXT,
  html,
};

export const Default = Template.bind({});
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Checklist, WidgetTypes } from '../widget';
import { ChecklistComponent } from './checklist.component';
import { CheckboxComponent } from './../checkbox/checkbox.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Widgets/Checlist',
  component: ChecklistComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
      ],
      declarations: [MatInput, MatIcon, MatFormField, CheckboxComponent],
    }),
  ],

  argTypes: {
    checklist: {
      name: 'Checklist',
      description: 'List of checkable items',
    },
  },
} as Meta;

const Template: Story<ChecklistComponent> = (args: ChecklistComponent) => ({
  props: args,
});

const checklistSample: Checklist = {
  id: 'sampleID',
  type: WidgetTypes.CHECKLIST,
  items: [
    {
      title: 'Go to the museum',
      done: false,
    },
    {
      title: 'Learn french',
      done: true,
    }
  ],
}

export const Default = Template.bind({});
Default.args = {
  checklist: checklistSample
};

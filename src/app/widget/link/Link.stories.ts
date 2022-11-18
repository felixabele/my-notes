// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Link, WidgetTypes } from '../widget';
import { LinkComponent } from './link.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Widgets/Link',
  component: LinkComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [MatInput, MatIcon, MatFormField],
    }),
  ],

  argTypes: {
    link: {
      name: 'Link',
      description: 'Representation of the Link',
    },
    urlModel: {
      name: "UrlModel"
    }
  },
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<LinkComponent> = (args: LinkComponent) => ({
  props: args,
});

const sampleLink: Link = {
  id: 'sampleID',
  type: WidgetTypes.LINK,
  url: 'https://sample.com',
  title: 'This is a sample link',
}

export const Default = Template.bind({});
Default.args = {
  link: sampleLink,
  urlModel: `${sampleLink.title}|${sampleLink.url}`
};

export const Editing = Template.bind({});
Editing.args = {
  ...Default.args,
  editing: true,
};
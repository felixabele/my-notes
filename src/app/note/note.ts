import { Widgets } from './../widget/widget';
export interface Note {
  id?: string;
  title: string;
  description: string;
  widgets?: Widgets;
}

export interface ExistingNote {
  id: string;
  title: string;
  description: string;
  widgets?: Widgets;
}
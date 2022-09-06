import { Widgets } from './../widget/widget';
export interface Note {
  id?: string;
  title: string;
  description: string;
  visible: boolean;
  widgets?: Widgets;
}

export interface ExistingNote {
  id: string;
  title: string;
  description: string;
  visible: boolean;
  widgets?: Widgets;
}
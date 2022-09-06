export enum WidgetTypes {
  CHECKLIST = 'checklist',
  RICH_TEXT = 'richText',
}

export interface ChecklistItem {
  id?: string;
  title: string;
  done: boolean;
}

export interface Checklist {
  id: string;
  type: WidgetTypes.CHECKLIST;
  items: ChecklistItem[];
}

export interface RichText {
  id: string;
  type: WidgetTypes.RICH_TEXT;
  html: string;
}

export type Widget = (Checklist | RichText)
export type Widgets = Widget[]

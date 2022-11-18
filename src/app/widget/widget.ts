export enum WidgetTypes {
  CHECKLIST = 'checklist',
  RICH_TEXT = 'richText',
  LINK = 'link',
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

export interface Link {
  id: string;
  type: WidgetTypes.LINK;
  url: string;
  title?: string;
}

export type Widget = (Checklist | RichText | Link)
export type Widgets = Widget[]

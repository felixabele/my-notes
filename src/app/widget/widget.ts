export interface ChecklistItem {
  id?: string;
  title: string;
  done: boolean;
}

export interface Checklist {
  id: string;
  type: 'checklist';
  items: ChecklistItem[];
}

export type Widget = (Checklist)
export type Widgets = Widget[]

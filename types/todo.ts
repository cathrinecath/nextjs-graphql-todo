export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface StaticItem {
  id: string;
  text: string;
}

export interface StaticListData {
  title: string;
  emoji: string;
  items: StaticItem[];
}

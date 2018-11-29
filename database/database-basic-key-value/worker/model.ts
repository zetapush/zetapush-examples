export interface TodoList {
  id: string;
  name: string;
}

export interface TodoItem {
  id: string;
  title: string;
  description?: string;
  creationDate: number;   // it is better to store date as timestamp
  done: boolean;
  doneDate?: number;      // it is better to store date as timestamp
}
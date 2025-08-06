export interface TodoItem {
  userId: number
  id: number
  title: string
  completed: boolean
};

export type TodoItemList = TodoItem[];

export type FormattedTodoItem = {
    userId: number
    completedCount: number
    incompleteCount: number
    todos: Omit<TodoItem, 'userId'>[]
}

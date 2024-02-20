export interface TaskManage {
  id: number;
  title: string;
  dueDate: Date|string;
  completed: boolean;
  status?: string;
  description?: string;
}

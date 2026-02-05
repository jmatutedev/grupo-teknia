export interface Task {
  userId?: number;      
  id: number;           
  title: string;
  description?: string;
  completed: boolean; 
  date?: string;   
}

export type CreateTaskDto = Omit<Task, 'id' | 'userId'>;
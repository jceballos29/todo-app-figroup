import { TaskResponse, Task } from './../types.d';

export const createTaskAdapter= ( task: TaskResponse): Task  => {
  return {
    id: task.id,
    task: task.task,
    completed: task.completed,
    priority: task.priority,
    scheduleAt: new Date(task.scheduleAt),
  };
}
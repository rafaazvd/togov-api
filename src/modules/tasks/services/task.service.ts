import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '../entities/task';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];
  private idCounter = 1;

  findAll(): Task[] {
    return this.tasks;
  }

  create(title: string, description: string): Task {
    const newTask: Task = {
      id: this.idCounter++,
      title,
      description,
      status: 'pending',
    };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, updatedTask: Partial<Task>): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    Object.assign(task, updatedTask);
    return task;
  }

  delete(id: number): void {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new NotFoundException('Task not found');
    }
    this.tasks.splice(index, 1);
  }
}

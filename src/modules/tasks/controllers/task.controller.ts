import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Task } from '../entities/task';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(): Task[] {
    return this.taskService.findAll();
  }

  @Post()
  create(@Body() body: { title: string; description: string }): Task {
    return this.taskService.create(body.title, body.description);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<Task>,
  ): Task {
    return this.taskService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): void {
    this.taskService.delete(id);
  }
}

import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepo: Repository<Task>,
  ) {}

  async findAllForUser(userId: string): Promise<Task[]> {
    return this.tasksRepo.find({
      where: { ownerId: userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOneForUser(id: string, userId: string): Promise<Task> {
    const task = await this.tasksRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    if (task.ownerId !== userId) {
      throw new ForbiddenException('You do not have access to this task');
    }
    return task;
  }

  async create(dto: CreateTaskDto, userId: string): Promise<Task> {
    const task = this.tasksRepo.create({ ...dto, ownerId: userId });
    return this.tasksRepo.save(task);
  }

  async update(id: string, dto: UpdateTaskDto, userId: string): Promise<Task> {
    const task = await this.findOneForUser(id, userId);
    Object.assign(task, dto);
    return this.tasksRepo.save(task);
  }

  async remove(id: string, userId: string): Promise<{ id: string }> {
    const task = await this.findOneForUser(id, userId);
    await this.tasksRepo.remove(task);
    return { id };
  }
}

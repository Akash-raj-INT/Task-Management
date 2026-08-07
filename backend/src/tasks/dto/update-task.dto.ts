import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

// Every field from CreateTaskDto becomes optional for PATCH updates
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

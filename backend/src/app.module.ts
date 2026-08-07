import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database:
        process.env.DB_PATH ||
        (process.env.VERCEL ? '/tmp/task-manager.sqlite' : 'task-manager.sqlite'),
      entities: [User, Task],
      synchronize: true, // fine for this assessment; use migrations in real production
    }),
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './create-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private prisma: PrismaService) {}

  @Get('')
  async getAll() {
    const result = await this.prisma.task.findMany();
    return [...result];
  }

  @Get('done')
  async getActiveList() {
    const result = await this.prisma.task.findMany({
      where: {
        is_done: false,
      },
    });
    return [...result];
  }

  @Post('')
  async add(@Body() task: CreateTaskDto) {
    await this.prisma.task.create({
      data: task,
    });
    return {
      status: 'OK',
    };
  }

  @Patch(':id')
  async done(@Param('id', ParseIntPipe) id: number) {
    await this.prisma.task.updateMany({
      data: {
        is_done: true,
      },
      where: {
        id: id,
      },
    });
    return {
      status: 'OK',
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.prisma.task.delete({
      where: {
        id: id,
      },
    });
    return {
      status: 'OK',
    };
  }
}

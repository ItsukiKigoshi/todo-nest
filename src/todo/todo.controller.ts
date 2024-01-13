import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './create-task.dto';

@Controller('todo')
export class TodoController {
  constructor(private prisma: PrismaService) {}

  @Get('list')
  async getList() {
    const result = await this.prisma.task.findMany();
    return [...result];
  }

  @Get('list/active')
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
    const result = await this.prisma.task.create({
      data: task,
    });
    return {
      status: 'OK',
    };
  }

  @Post('done/:id')
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
}

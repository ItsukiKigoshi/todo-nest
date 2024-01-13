import { Controller, Get } from '@nestjs/common';

@Controller('todo')
export class TodoController {
  @Get('list')
  getList() {
    return [
      {
        title: 'ARW Annotated Bibliography',
        dueDate: '2024-01-13',
        done: false,
      },
    ];
  }
}

import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { User } from '@prisma/client';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'hello-user' })
  getHello(): string {
    return this.userService.getHello();
  }

  @MessagePattern({ cmd: 'find-one-user' })
  async findOneUser(data: { email: string }): Promise<User> {
    return this.userService.findOneUser(data);
  }

  @MessagePattern({ cmd: 'find-user-by-id' })
  async findUserById(data: { id: string }): Promise<User> {
    return this.userService.findUserById(data);
  }
}

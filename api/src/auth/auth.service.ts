import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async checkIfUserAlreadyExists(email: string) {
    return this.userService.getOneUserFromEmail(email);
  }
}

import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async checkIfUserAlreadyExists(email: string) {
    return this.userService.getOneUserFromEmail(email);
  }

  async encryptPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async registerNewUser(userToCreate: {
    email: string;
    username: string;
    passwordHash: string;
  }) {
    return this.userService.createUser(userToCreate);
  }

  async checkIfPasswordMatches(password: string, passwordHash: string) {
    return bcrypt.compare(password, passwordHash);
  }

  async createToken(userData: { id: string; username: string; email: string }) {
    return this.jwtService.sign({
      sub: userData.id,
      username: userData.username,
      email: userData.email,
    });
  }
}

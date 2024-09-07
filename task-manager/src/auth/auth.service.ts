/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {
    console.log('JWT_SECRET:', process.env.JWT_SECRET); // Debug log
  }

  async validateUser(username: string, password: string): Promise<any> {
    const validUser = { username: 'admin', password: 'password123' };
    if (username === validUser.username && password === validUser.password) {
      return { username: validUser.username };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { username: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }
}

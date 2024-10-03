import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.schema';
import * as bcrypt from 'bcryptjs';
import { UserDto } from './dto/user.dto';
import { console } from 'inspector';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string): Promise<any> {
    console.log('register method called with username : ', username, " and password : ", password);
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
        return { error: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, password: hashedPassword });
    await user.save();
    const payload = { username: user.username, sub: user._id };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    if (user && (await bcrypt.compare(pass, user.password))) {
        console.log('user found with username : ', username);
      return user;
    }
    return null;
  }

  async login(user: any) {
    console.log('login method called with user : ', user, 'assign secret key', process.env.JWT_SECRET);
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}

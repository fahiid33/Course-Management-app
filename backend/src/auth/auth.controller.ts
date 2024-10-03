import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

@Post('register')
    async register(@Body() userDto: UserDto, @Res() response) {
        console.log('register method in controller called with username : ', userDto.username, " and password : ", userDto.password);
        try {
                const user = await this.authService.register(userDto.username, userDto.password);
                return response.status(HttpStatus.CREATED).json(user);
        } catch (error) {
                console.error('Error during registration:', error);
                return response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }
    
@Post('login')
    async login(@Body() userDto: UserDto) {
        const user = await this.authService.validateUser(userDto.username, userDto.password);
        if (!user) {
                return { error: 'Invalid username or password' };
        }
        return this.authService.login(user);
    }
    
@UseGuards(JwtAuthGuard)
@Post('profile')
    getProfile(@Req() req) {
        return req.user;
}
}

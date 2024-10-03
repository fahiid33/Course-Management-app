import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    console.log('authHeader:', authHeader);

    if (!authHeader) {
      return false; // No token provided
    }

    const token = authHeader.split(' ')[1]; // Extract the token from 'Bearer TOKEN'
    try {
      const payload = this.jwtService.verify(token);
      request.user = payload; // Store user data in request
      console.log('payloooooad:', payload);
      return true; // Token is valid
    } catch (err) {
      console.error('Error during token verification:', err);
      return false; // Token is invalid
    }
  }
}

import {
  Controller,
  Post,
  Body,
  UseGuards,
  BadRequestException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../../public.decorator';
import { JwtGuard } from './jwt.guard';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authenticationService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authenticationService.register(registerDto);
  }

  @Post('login')
  @UseGuards(JwtGuard)
  async login(@Body() loginDto: LoginDto) {
    const validatedUser = await this.authenticationService.validateUser(loginDto.email, loginDto.password);

    if (validatedUser) {
      return this.authenticationService.login(validatedUser);
    } else {
      throw new BadRequestException('User not found');
    }
  }
}

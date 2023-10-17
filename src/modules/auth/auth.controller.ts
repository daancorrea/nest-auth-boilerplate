import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { UserActiveGuard } from 'src/common/guards/user-active.guard';
import MongooseClassSerializerInterceptor from 'src/common/transformer/mongooseClassSerializer.interceptor';
import { User } from '../user/models/user.model';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(
    @Body() loginDto: LoginDto,
    @CurrentUser() user: User,
  ): Promise<User> {
    return user;
  }

  @Post('register')
  @ApiResponse({ status: 200, description: 'Register successful' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard, UserActiveGuard)
  @ApiResponse({ status: 200, description: 'Valid Token' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getLoggedInUser(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}

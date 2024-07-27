import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UserService } from 'src/services/user/user.service';
import { CreateUserDto, UpdateUserDto, UserDto } from 'src/DTOs/user.dto';
import { LinkedInScraperService } from 'src/scraping/linkedin-scraper.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get('all')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async getUsers(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async getUser(@Query('id') id: string): Promise<UserDto> {
    const user = this.userService.findOneById(id);

    if (user) return user;
    else throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  @Get('/scrape')
  @UsePipes(ValidationPipe)
  async scrapeUser(@Query('url') url: string): Promise<any> {
    const user = await new LinkedInScraperService().scrapeProfile(url);

    console.log({ user });
    if (user) return user;
    else throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() newUser: CreateUserDto): Promise<UserDto> {
    return this.userService.create(newUser);
  }

  @Put()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Query('id') id: string,
    @Body() updatedUser: UpdateUserDto,
  ): Promise<any> {
    return this.userService
      .update(id, updatedUser)
      .then(() => {
        return { message: 'User was updated successfully' };
      })
      .catch((err) => err.message);
  }

  @Delete()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async removeUser(@Query('id') id: string): Promise<any> {
    return this.userService
      .remove(id)
      .then(() => {
        return { message: 'User was deleted successfully' };
      })
      .catch((err) => err.message);
  }
}

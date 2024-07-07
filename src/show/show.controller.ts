import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ShowService } from './show.service';
import { ShowRegisterDto } from './dto/showregister.dto';

@Controller('shows')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Post('register')
  async register(@Body() showRegisterDto: ShowRegisterDto) {
    return await this.showService.showRegister(
      showRegisterDto.title,
      showRegisterDto.description,
      showRegisterDto.category,
      showRegisterDto.location,
      showRegisterDto.price,
      showRegisterDto.showImage,
    );
  }

  @Get()
  async findAll() {
    return await this.showService.findAll();
  }

  @Get('search')
  async search(
    @Query('title') title?: string,
    @Query('category') category?: string,
    @Query('location') location?: string,
  ) {
    if (title) {
      return await this.showService.findTitle(title);
    }
    if (category) {
      return await this.showService.findCategory(category);
    }

    if (location) {
      return await this.showService.findLocation(location);
    }
    return []; // 또는 적절한 응답을 반환
  }
}

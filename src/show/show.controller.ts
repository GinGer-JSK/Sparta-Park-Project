import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ShowService } from './show.service';
import { ShowRegisterDto } from './dto/showregister.dto';
import { UpdateShowDto } from './dto/updateshow.dto';

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
    return [];
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.showService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShowDto: UpdateShowDto,
  ) {
    return await this.showService.updateShow(id, updateShowDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.showService.deleteShow(id);
    return { message: '삭제 완료!' };
  }
}

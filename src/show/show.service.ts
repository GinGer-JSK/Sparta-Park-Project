import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Show } from './entities/show.entity';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) {}

  async showRegister(
    title: string,
    description: string,
    category: string,
    location: string,
    price: number,
    showImage: string,
  ) {
    const newShow = this.showRepository.create({
      title,
      description,
      category,
      location,
      price,
      showImage,
    });
    await this.showRepository.save(newShow);
    return newShow;
  }

  async findAll(): Promise<Show[]> {
    return await this.showRepository.find({
      select: [
        'id',
        'title',
        'price',
        'description',
        'category',
        'location',
        'createdAt',
      ],
    });
  }

  async findTitle(title: string): Promise<Show[]> {
    return await this.showRepository.find({
      where: { title: Like(`%${title}%`) },
      select: [
        'id',
        'title',
        'price',
        'description',
        'category',
        'location',
        'createdAt',
      ],
    });
  }

  async findCategory(category: string): Promise<Show[]> {
    return await this.showRepository.find({
      where: { category: Like(`%${category}%`) },
      select: [
        'id',
        'title',
        'price',
        'description',
        'category',
        'location',
        'createdAt',
      ],
    });
  }

  async findLocation(location: string): Promise<Show[]> {
    return await this.showRepository.find({
      where: { location: Like(`%${location}%`) },
      select: [
        'id',
        'title',
        'price',
        'description',
        'category',
        'location',
        'createdAt',
      ],
    });
  }
}

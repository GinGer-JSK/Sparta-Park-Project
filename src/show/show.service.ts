import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
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
    const existingShow = await this.findByTitle(title);
    if (existingShow) {
      throw new ConflictException('이미 해당하는 공연이 있습니다!');
    }
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

  async findByTitle(title: string) {
    return await this.showRepository.findOneBy({ title });
  }

  async deleteShow(id: number): Promise<void> {
    const result = await this.showRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`해당하는 공연을 찾을 수 없습니다.`);
    }
  }

  async findOne(id: number): Promise<Show> {
    const show = await this.showRepository.findOne({ where: { id } });
    if (!show) {
      throw new NotFoundException(`해당하는 공연을 찾을 수 없습니다.`);
    }
    return show;
  }

  async updateShow(id: number, updateData: Partial<Show>): Promise<Show> {
    await this.showRepository.update(id, updateData);
    const updatedShow = await this.showRepository.findOne({ where: { id } });
    if (!updatedShow) {
      throw new NotFoundException(`Show with ID ${id} not found`);
    }
    return updatedShow;
  }
}

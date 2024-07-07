import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { Repository } from 'typeorm';

import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Role } from './types/userRole.type';
import { UpdateUserDto } from './dto/updateuser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string, nickname: string) {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      );
    }

    const hashedPassword = await hash(password, 10);
    await this.userRepository.save({
      email,
      password: hashedPassword,
      nickname,
    });
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password', 'role'],
      where: { email },
    });
    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    const payload = { email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
  async findOne(id: number): Promise<{
    id: number;
    email: string;
    nickname: string;
    role: string;
    point: number;
    createdAt: Date;
    updatedAt: Date;
  }> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`해당하는 유저를 찾을 수 없습니다.`);
    }
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      role: user.role === Role.CUSTOMER ? 'CUSTOMER' : 'ADMIN',
      point: user.point,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
  async updateUser(
    id: number,
    updateData: UpdateUserDto,
  ): Promise<{
    id: number;
    email: string;
    nickname: string;
    role: string;
    point: number;
    createdAt: Date;
    updatedAt: Date;
  }> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`해당하는 유저를 찾을 수 없습니다.`);
    }

    if (updateData.password) {
      user.password = await hash(updateData.password, 10);
    }

    if (updateData.nickname) {
      user.nickname = updateData.nickname;
    }

    await this.userRepository.save(user);

    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      role: user.role === Role.CUSTOMER ? 'CUSTOMER' : 'ADMIN',
      point: user.point,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

import { ConflictException, Injectable } from '@nestjs/common';
import { BlogUserRepository, BlogUserEntity } from '@project/account/blog-user';
import dayjs from 'dayjs';
import { CreateUserDto } from '../dto/create-user.dto';
import { AUTH_USER_EXISTS } from './authentication.constant';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository
  ) {}

  public async register(dto: CreateUserDto) {
    const {email, username, avatar, password} = dto;

    const blogUser = {
      email,
      username,
      avatar,
      regDate: dayjs().toDate(),
      passwordHash: ''
    };

    const existUser = await this.blogUserRepository.findByEmail(email);
    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password)

    return this.blogUserRepository.save(userEntity);
  }

}

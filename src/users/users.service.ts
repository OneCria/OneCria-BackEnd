import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async create(createUserDto: CreateUserDto) {
    const User = await this.knex('users')
    .insert(createUserDto)
    .returning('*');
    return User;
  }

  async findAll() {
    const User = await this.knex('users')
    .returning('*'); 
    return User
  }

  findOne(id: number) {
    const User = this.knex('users')
    .where({ id })
    .returning('*');
    return User;
  }

  findOneByUser(username: string) {
    console.log(username)
    const User = this.knex('users')
      .where({ name: username })
      .returning('*');
    return User;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const User = await this.knex('users')
    .where({ id })
    .insert(updateUserDto)
    .returning('*');
    return User;
  }

  async remove(id: number) {
    const User = await this.knex('users')
    .where({ id })
    .delete()
    .returning('*');
    return User;
  }
}

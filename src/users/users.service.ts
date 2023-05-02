import { Injectable } from '@nestjs/common';
import { User } from './entities/user';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // async login(user: User) {
  //   const task = this.userModel.findOne({ name: user.name });
  //   if(!task) {
  //     console.log("tarias")
  //   }
  //   return {task};
  // }

  async create(user: User) {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async findAll() {
    const users = await this.userModel.find().exec(); 
    return {users}
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, User: User) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

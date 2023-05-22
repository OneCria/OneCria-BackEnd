import { Injectable } from '@nestjs/common';
import { Character } from './entities/character.entity';
import { CreateCharacterDto } from './dto/create-character.dto';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { UpdateCharacterDto } from './dto/update-character.dto';


import { google } from 'googleapis';
import path from 'path';
import { Stream } from 'stream';

// const KEYFILEPATH = path?.join(__dirname + "credentials.json");


const img = "uploads/token/2a9f95b5cd7b12e99535d9be58410928e.jpg"


@Injectable()
export class CharacterRepository {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  public async findAll(user_id: number): Promise<any> {
    const Character = await this.knex('public.characters')
      .select('*')
      .where({ user_id });
    return Character;
  }

  public async findOne(id: number): Promise<any> {
    const Character = await this.knex('public.characters')
      .select('*')
      .where({ id });
    return Character;
  }

  public async create(body: CreateCharacterDto, id: number): Promise<any> {
    console.log(body)
    const Character = await this.knex('public.characters')
      .insert(body)
      .returning('*');
    return Character;
  }

  public async update(id: number, body: UpdateCharacterDto, ): Promise<any> {
    //console.log('AAAAAAAAAAAAAAAAAAAAAAAAA', body.token)
    const Character = await this.knex('public.characters')
      .update(body)
      .where({ id })
      .returning('*');
      //await uploadFile(body.token)
    return Character
  }
  public async delete(id: number): Promise<any> {
    const Character = await this.knex('public.characters')
      .delete('*')
      .where({ id })
      .returning('*');
  }
}

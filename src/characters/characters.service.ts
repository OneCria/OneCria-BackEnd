import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CharacterRepository } from './characters.repository';
import { google } from 'googleapis';
import path from 'path';
import { Stream } from 'stream';


const KEYFILEPATH = "credentials.json";
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
})
@Injectable()
export class CharactersService {
  constructor(private readonly characterRepository: CharacterRepository) {}

  create(createCharacterDto: CreateCharacterDto, user: number) {
    return this.characterRepository.create(createCharacterDto, user);
  }

  findAll(user: number) {
    return this.characterRepository.findAll(user);
  }
  findAllOptions() {
    const data = {
      races: [
        'Anão',
        'Celestiai',
        'Gigante',
        'Homem-Peixe',
        'Humano',
        'Kuja',
        'Lunariano',
        'Meio Homem-Peixe',
        'Mink',
        'Sireno',
      ],
      classes: [
        'Atirador',
        'Carateca_Homem_Peixe',
        'Ciborgue',
        'Guerreiro_Oni',
        'Guerrilheiro',
        'Lutador',
        'Ninja',
        'Okama Kenpo',
        'Rokushiki',
      ],
      careers: ['Navegador', 'Cientista', 'Combatente'],
    };
    return data;
  }

  update(user: number, updateCharacterDto: UpdateCharacterDto) {
    return this.characterRepository.update(user, updateCharacterDto);
  }

  remove(user: number) {
    return this.characterRepository.delete(user);
  }

  async updateToken(id: string, fileObject: any) {
    const bufferStream = new Stream.PassThrough();
    
    bufferStream.end(fileObject.buffer);
    const { data } = await google
      .drive({
        version: 'v3',
        auth: auth,
      })
      .files.create({
        media: {
          mimeType: fileObject.mimeType,
          body: bufferStream,
        },
        requestBody: {
          name: fileObject.originalname,
          parents: ['1XoUblb6oo_zEWCQw-tO0eOvucrFEAqXs'],
        },
        fields: 'id, name',
      });
    //console.log(`Uploaded file ${data.name} ${data.id}`);
    console.log(data)
    const character = await this.characterRepository.findOne(+id);

    return character;
  }
}

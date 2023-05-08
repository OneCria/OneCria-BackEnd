import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CharacterRepository } from './characters.repository';

@Injectable()
export class CharactersService {
  constructor(private readonly characterRepository: CharacterRepository) {}

  create(createCharacterDto: CreateCharacterDto, id: number) {
    return this.characterRepository.create(createCharacterDto, id);
  }

  findAll(id: string) {
    return this.characterRepository.findAll(id);
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return this.characterRepository.update(updateCharacterDto, id);
  }

  remove(id: number) {
    return this.characterRepository.delete(id);
  }
}

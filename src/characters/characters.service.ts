import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CharacterRepository } from './characters.repository';

@Injectable()
export class CharactersService {
  constructor(private readonly characterRepository: CharacterRepository) {}

  create(createCharacterDto: CreateCharacterDto, user: number) {
    return this.characterRepository.create(createCharacterDto, user);
  }

  findAll(user: number) {
    return this.characterRepository.findAll(user);
  }
  findAllOptions(){
    const data = {
      races:[
        "Anão",
        "Celestiai",
        "Gigante",
        "Homem-Peixe",
        "Humano",
        "Kuja",
        "Lunariano",
        "Meio Homem-Peixe",
        "Mink",
        "Sireno",
      ],
      classes: [
        "Atirador",
        "Carateca_Homem_Peixe",
        "Ciborgue",
        "Guerreiro_Oni",
        "Guerrilheiro",
        "Lutador",
        "Ninja",
        "Okama Kenpo",
        "Rokushiki",
      ],
      careers: [
        "Navegador",
        "Cientista",
        "Combatente"
      ]
    }
    return data
  }

  update(user: number, updateCharacterDto: UpdateCharacterDto) {
    return this.characterRepository.update(updateCharacterDto, user);
  }

  remove(user: number) {
    return this.characterRepository.delete(user);
  }
}

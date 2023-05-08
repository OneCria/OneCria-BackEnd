import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { CharacterRepository } from './characters.repository';

@Module({
  controllers: [CharactersController],
  providers: [CharactersService, CharacterRepository]
})
export class CharactersModule {}

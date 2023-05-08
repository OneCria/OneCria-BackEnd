import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto,
  @Param(':id') user:string) {
    return this.charactersService.create(createCharacterDto, +user);
  }

  @Get()
  findAll(@Query('user') user:string) {
    return this.charactersService.findAll(+user);
  }

  @Get('options')
  findAllOptions(@Param('options') options:string) {
    return this.charactersService.findAllOptions();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto) {
    return this.charactersService.update(+id, updateCharacterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charactersService.remove(+id);
  }
}

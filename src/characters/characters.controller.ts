import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Helper } from 'src/shared/helper';

import { google } from 'googleapis';
import path from 'path';
import { Stream } from 'stream';

// const KEYFILEPATH = path?.join(__dirname + "credentials.json");
const KEYFILEPATH = "credentials.json";
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
});

const uploadFile = async (fileObject) => {
    const bufferStream = new Stream.PassThrough()
    bufferStream.end(fileObject?.buffer)
    const { data } = await google.drive({
        version: 'v3',
        auth: auth
    }).files.create({
        media: {
            mimeType: fileObject?.mimeType,
            body: bufferStream
        },
        requestBody: {
            name: fileObject?.originalname,
            parents: ["1XoUblb6oo_zEWCQw-tO0eOvucrFEAqXs"]
        },
        fields: "id,name"
    })
    // console.log('request', req.body.token)
    // console.log('file', file)
    console.log(`Uploaded file ${data.name} ${data.id}`)
}

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) { }

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto,
    @Param(':id') user: string) {
    return this.charactersService.create(createCharacterDto, +user);
  }

  @Get()
  findAll(@Query('user') user: string) {
    return this.charactersService.findAll(+user);
  }

  @Get('options')
  findAllOptions(@Param('options') options: string) {
    return this.charactersService.findAllOptions();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto) {
    return this.charactersService.update(+id, updateCharacterDto);
  }

  @Patch(':id/token')
  @UseInterceptors(
    FileInterceptor('token', {
      storage: diskStorage({
        destination: './uploads/token',
        filename: Helper.customFileName
      })
    }))

  async updateToken(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // console.log('FAIOU', file.path.replace(/[\\"]/g, '/'));

    await uploadFile(file);
    
    return this.charactersService.updateToken(id, file?.path)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charactersService.remove(+id);
  }
}

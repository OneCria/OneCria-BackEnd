import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCharacterDto {
  @IsString()
  name: string;
  @IsNumber()
  user_id: number;
  @IsString()
  race: string;
  @IsString()
  class: string;
  @IsString()
  career: string;
  @IsNumber()
  level: number;
  @IsString()
  @IsOptional()
  akuma: string;
  @IsNumber()
  life: number;
  @IsNumber()
  currentlife: number;

  constructor(
    name: string,
    user_id: number,
    race: string,
    classe: string,
    career: string,
    level: number,
    akuma: string,
    life: number,
    currentlife: number
  ) {
    this.name = name,
    this.user_id = user_id;
    this.race = race;
    this.class = classe;
    this.career = career;
    this.level = level;
    this.akuma = akuma;
    this.life = life;
    this.currentlife = currentlife;
  }
}
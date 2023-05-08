import { IsNumber, IsString } from "class-validator";

export class CreateCharacterDto {
  @IsString()
  race: string;
  @IsString()
  class: string;
  @IsString()
  career: string;
  @IsNumber()
  level: number;
  @IsString()
  akuma: string;
  @IsNumber()
  life: number;
  @IsNumber()
  currentlife: number;

  constructor(
    race: string,
    classe: string,
    career: string,
    level: number,
    akuma: string,
    life: number,
    currentlife: number
  ) {
    this.race = race;
    this.class = classe;
    this.career = career;
    this.level = level;
    this.akuma = akuma;
    this.life = life;
    this.currentlife = currentlife;
  }
}
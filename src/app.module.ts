import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs/dist';
import { UsersModule } from './users/users.module';
import { CharactersModule } from './characters/characters.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    KnexModule.forRoot(
      {
        config: {
          client: 'pg',
          connection: {
            host: 'ep-odd-sky-289057.us-east-2.aws.neon.tech',
            user: 'heystevenn',
            database: 'neondb',
            password: 'wB95OZxfVaWz',
            port: 5432,
            ssl: { rejectUnauthorized: true },
          },
          migrations: {
            directory: '../migrations',
            loadExtensions: ['.js']
          }
        }
      }
    )
    ,
    UsersModule,
    CharactersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

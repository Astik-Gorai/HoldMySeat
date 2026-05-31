import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatsModule } from '../seats/seats.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_CONNECTION_STRING,
      autoLoadEntities: true,

      synchronize: true,

      ssl: {
        rejectUnauthorized: false,
      },
    }),
    SeatsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

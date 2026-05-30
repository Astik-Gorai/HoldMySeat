import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from '../events/events.module';
import { VenuesModule } from '../venues/venues.module';
import { ShowsModule } from '../shows/shows.module';

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
    EventsModule,
    VenuesModule,
    ShowsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

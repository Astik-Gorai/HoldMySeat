import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowSeatsEntity } from './models/show-seats.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShowSeatsEntity])
  ],
  controllers: [SeatsController],
  providers: [SeatsService],
})
export class SeatsModule {}

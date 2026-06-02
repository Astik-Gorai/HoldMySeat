import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SeatInitDto } from './models/seats.init.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { ShowSeatsEntity } from './models/show-seats.entity';
import { SeatsStatusUpdateDto } from './models/seats-status-update.dto';
import { SeatStatusEnum } from './models/seats-status.enum';

@Injectable()
export class SeatsService {
    constructor(
        @InjectRepository(ShowSeatsEntity) private readonly seatRepo: Repository<ShowSeatsEntity>,
        private readonly dataSoure: DataSource
    ){}

    async initializeSeats(seatInitPayload: SeatInitDto) {
        const showId = seatInitPayload.showId;
        const venueSeats = seatInitPayload.venueSeats;
        console.log('venueSeats',venueSeats);
        const seatsToCreate: ShowSeatsEntity[] = [];
        if(venueSeats.length === 0) return new HttpException('No venue seats provided', HttpStatus.BAD_REQUEST);
        for(const seat of venueSeats){
            const showSeat = this.seatRepo.create({
                show_id: showId,
                venue_seat_id: seat.id,
                status: SeatStatusEnum.AVAILABLE,
                hold_by: null,
                hold_until: null
            });
            seatsToCreate.push(showSeat);
        }
        await this.dataSoure.transaction(async (txManager)=>{
            const txSeatRepo = txManager.getRepository(ShowSeatsEntity)
            // Save with 'chunk' configuration to protect database memory boundaries
            await txSeatRepo.save(seatsToCreate, { chunk: 500 });
        })
        console.log('Seats initialized successfully');
        return {message: 'Seats initialized successfully'}
    }

    async getShowHeatMap(showId:string){
        const shows = await this.seatRepo.find({
            where:{show_id: showId}
        })
        return shows
    }

    async cancelShowSeats(showId:string){
        await this.seatRepo.update({show_id: showId}, {status: SeatStatusEnum.CANCELLED});
        return {message: 'Show seats cancelled successfully'}
    }

    async editStatusSeat(editSeatPayload: SeatsStatusUpdateDto){
        try{
            const fiveMinutesFromNow = new Date(Date.now() + 5 * 60 * 1000);
            await this.dataSoure.transaction( async (transectionManager) =>{
                const txSeatRepo = transectionManager.getRepository(ShowSeatsEntity);
                await txSeatRepo.update(
                    {id: In(editSeatPayload.seatIds)},
                    {status: editSeatPayload.newStatus,
                        hold_by: editSeatPayload.userId,
                        hold_until: fiveMinutesFromNow
                    }
                )

            })

        }catch(err){
            if(err instanceof HttpException) return err;
            throw new Error('Error while holding seats '+err.message);
        }
    }

    






}
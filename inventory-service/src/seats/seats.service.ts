import { HttpException, Injectable } from '@nestjs/common';
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
        const seatsToCreate: ShowSeatsEntity[] = [];
        const seats = []

        // We need to fetch seat details from the event-catalog-service
        
        seats.forEach(seat => {
            const showSeat = this.seatRepo.create({
                venue_seat_id: seat.venue_seat_id
            });
            
            seatsToCreate.push(showSeat);
        });
    
        if (seatsToCreate.length === 0) return;
        await this.dataSoure.transaction(async (txManager)=>{
            const txSeatRepo = txManager.getRepository(ShowSeatsEntity)
            // Save with 'chunk' configuration to protect database memory boundaries
            await txSeatRepo.save(seatsToCreate, { chunk: 500 });
        })
        
    }

    async getShowHeatMap(showId:string){
        const shows = await this.seatRepo.find({
            where:{show_id: showId}
        })
        return shows
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

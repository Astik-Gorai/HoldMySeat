import { HttpException, Injectable } from '@nestjs/common';
import { SeatInitDto } from './models/seats.init.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { SeatEntity } from './models/seat.entity';
import { SeatsStatusUpdateDto } from './models/seats-status-update.dto';
import { SeatStatusEnum } from './models/seats-status.enum';

@Injectable()
export class SeatsService {
    constructor(
        @InjectRepository(SeatEntity) private readonly seatRepo: Repository<SeatEntity>,
        private readonly dataSoure: DataSource
    ){}

    async initializeSeats(seatInitPayload: SeatInitDto) {
        const seatsToCreate: SeatEntity[] = [];
    
        seatInitPayload.seats.forEach(seat => {
            const showSeat = this.seatRepo.create({
                x_position: seat.x_pos,
                y_position: seat.y_pos,
                seat_label: seat.seat_label
            });
            
            seatsToCreate.push(showSeat);
        });
    
        if (seatsToCreate.length === 0) return;
        await this.dataSoure.transaction(async (txManager)=>{
            const txSeatRepo = txManager.getRepository(SeatEntity)
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
                const txSeatRepo = transectionManager.getRepository(SeatEntity);
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

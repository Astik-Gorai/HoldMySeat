import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VenuesEntity } from './models/venues.entity';
import { DataSource, Repository } from 'typeorm';
import { RegisterVenueDto } from './models/register-venue.dto';
import { VenueSeatsEntity } from './models/venue-seats.entity';

@Injectable()
export class VenuesService {
    constructor(@InjectRepository(VenuesEntity) private readonly venueRepo : Repository<VenuesEntity>,
        @InjectRepository(VenueSeatsEntity) private readonly venueSeatsRepo: Repository<VenueSeatsEntity>,
        private readonly dataSource: DataSource
    ){}


    async registerVenue(venueData: RegisterVenueDto){
        try{

            await this.dataSource.transaction(async (manager)=>{
                const txVenueRepo = manager.getRepository(VenuesEntity);
                const txVenueSeatsRepo = manager.getRepository(VenueSeatsEntity);

                const newVenue = txVenueRepo.create({
                    name: venueData.venue_name,
                    city: venueData.city_name,
                    address: venueData.venue_address,
                    capacity: venueData.capacity,
                    pinCode: venueData.pin_code
                })
                await txVenueRepo.save(newVenue);

                const newSeats = venueData.seats.map((seat)=>{
                    return txVenueSeatsRepo.create({
                        seatLabel: seat.seat_label,
                        xPosition: seat.x_position,
                        yPosition: seat.y_position,
                        venue: newVenue
                    })
                })
                await txVenueSeatsRepo.save(newSeats);

            })
            
            return {message: `${venueData.venue_name} has been registered successfuly`}

        }catch(err){
            if(err instanceof HttpException){
                return err;
            }
            throw new Error('Error while registering an Venue '+err.message)
        }
    }

    async deleteVenue(venue_id: string){
        try{
            const venue = await this.venueRepo.findOne({
                where: { id: venue_id}
            })
            await this.venueRepo.delete(venue)

        }catch(err){
            if(err instanceof HttpException)
                return err;
            throw new Error(`getting error while deleting the venue: ${err.message}`)
        }
    }

    async getAllVenues(){
        try{
            const allVenues = await this.venueRepo.find();
            return allVenues;
        }catch(err){
            throw new Error(`Error while fetching all venues: ${err.message}`)
        }
    }


    async getVenueSeats(venue_id: string){
        try{
            const venueSeats = await this.venueSeatsRepo.find({
                where: {
                    venue: {
                        id: venue_id
                    }
                }
            })
            return venueSeats;
        }catch(err){
            throw new Error(`Error while fetching venue seats: ${err.message}`)
        }
    }
}

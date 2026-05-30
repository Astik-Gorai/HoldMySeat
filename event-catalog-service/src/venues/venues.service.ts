import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VenuesEntity } from './models/venues.entity';
import { Repository } from 'typeorm';
import { RegisterVenueDto } from './models/register-venue.dto';

@Injectable()
export class VenuesService {
    constructor(@InjectRepository(VenuesEntity) private readonly venueRepo : Repository<VenuesEntity>){}


    async registerVenue(venueData: RegisterVenueDto){
        try{
            const venue = await this.venueRepo.create({
                name: venueData.venue_name,
                city: venueData.city_name,
                address: venueData.venue_address,
                capacity: venueData.capacity,
                pinCode: venueData.pin_code,

            })
            await this.venueRepo.save(venue)
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
}

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VenuesEntity } from "./venues.entity";

@Entity('venue_seats')
export class VenueSeatsEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => VenuesEntity, (venue) => venue.seats)
    @JoinColumn({ name: 'venue_id' })
    venue: VenuesEntity;

    // @Column({ name: 'venue_id', type: 'uuid' })
    // venueId: string;

    @Column({ name: 'seat_label' })
    seatLabel: string;

    @Column({ name: 'x_position' })
    xPosition: number;

    @Column({ name: 'y_position' })
    yPosition: number;

}
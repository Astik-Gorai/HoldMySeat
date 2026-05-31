import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SeatStatusEnum } from "./seats-status.enum";


@Entity('show-seats')
export class ShowSeatsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('uuid')
    show_id:string

    @Column({
        type: 'enum',
        enum: SeatStatusEnum,
        default: SeatStatusEnum.AVAILABLE
    })
    status: SeatStatusEnum

    @Column('uuid')
    venue_seat_id: string

    @Column({
        default: null,
        nullable: true,
        type: 'uuid',
    })
    hold_by:string

    @Column({
        default: null,
        nullable: true,
        type: 'date',
    })
    hold_until: Date
}
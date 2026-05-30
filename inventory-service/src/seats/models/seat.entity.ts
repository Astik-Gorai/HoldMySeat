import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SeatStatusEnum } from "./seats-status.enum";


@Entity('seats')
export class SeatEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('uuid')
    show_id:string

    @Column({
        type: 'enum',
        default: SeatStatusEnum.AVAILABLE
    })
    status: SeatStatusEnum

    @Column()
    x_position: number

    @Column()
    y_position:number
    
    @Column()
    seat_label: string

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
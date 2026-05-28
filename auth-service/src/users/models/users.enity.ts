import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";


@Entity('users_data')
export class Users{
    @PrimaryGeneratedColumn('uuid')
    @Index()
    user_id: string

    @Column({
        unique: true,
        nullable: false
    })
    email: string

    @Column({})
    first_name: string

    @Column()
    last_name: string

    @Column()
    password : string

    @Column({
        default: false
    })
    isPartner: boolean

}
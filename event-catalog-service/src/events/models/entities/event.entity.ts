import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventStatus, EventType } from '../constants';
import { EventShowEntity } from '../../../shows/models/event_show.entity';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @Column({
    type: 'enum',
    enum: EventType,
  })
  type: EventType;

  @Column()
  name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.DRAFT,
  })
  status: EventStatus;

  // @Column({
  //   array: true
  // })
  // location_cities: string[];

  @Column({
    default: ''
  })
  banner_url: string;

  // Reference by ID -> This will ask the auth-service msvc if this ID exist or not
  @Column({
    type: 'uuid',
  })
  organizer_id: string;

  // Automatically set when the row is first inserted
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  // Automatically updated every time the row is modified
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @OneToMany(() => EventShowEntity, (eventShow) => eventShow.event)
  shows: EventShowEntity[];
}

/*
We only need to explicitly pass the type inside the @Column option whene:

    1. We want a specific subtype (like wanting `text` block or a `uuid` instead of a standard 'varchar')
    2. We are dealing with complex types like 'enum' , 'jsobb'


- The @UpdateDateColumn only updates the timestamp only if we use save funciton while updating the entity

*/

/* eslint-disable prettier/prettier */
import { Entity, ObjectIdColumn, Column, OneToMany } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Task } from '../task/task.entity';

@Entity()
export class Team {
  @ObjectIdColumn()
  _id: ObjectId | string;

  @Column()
  name: string;

  @Column('array')
  members: Task[];
}

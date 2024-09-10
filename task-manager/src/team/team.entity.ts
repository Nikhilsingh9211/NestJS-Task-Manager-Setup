/* eslint-disable prettier/prettier */
import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Assignee } from 'src/assignee/assignee.entity';
// import { Task } from '../task/task.entity';


@Entity()
export class Team {
  @ObjectIdColumn()
  _id: ObjectId | string;

  @Column()
  name: string;

  @Column('array')
  members: Assignee[];
}

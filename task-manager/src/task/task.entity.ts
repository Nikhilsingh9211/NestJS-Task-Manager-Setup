/* eslint-disable prettier/prettier */
import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Task {
  @ObjectIdColumn()
  _id: ObjectId | string;

  @Column()
  description: string;

  @Column()
  dueDate: Date;

  @Column()
  assignee: string;

  @Column()
  status: string; // e.g., 'Pending', 'Completed'
}

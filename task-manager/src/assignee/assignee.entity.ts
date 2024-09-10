/* eslint-disable prettier/prettier */
// src/assignee/assignee.entity.ts

import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

@Entity()
export class Assignee {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  role: string;
}

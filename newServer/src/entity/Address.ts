import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

export class Address {
  @Column()
  street: String;

  @Column()
  houseNumber: String;

  @Column()
  zipCode: String;

  @Column()
  city: String;
}

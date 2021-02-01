import { table } from "console";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn } from "typeorm";
import { Address } from "./Address";

@Entity()
export class Company {
  @PrimaryColumn()
  id: number;

  @Column()
  name: String;
  @Column()
  logo: String;
  @Column((type) => Address, { prefix: "" })
  address: Address;
  @Column()
  phone: String;
  @Column()
  email: String;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: "client_template" })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  street: string;
  @Column({ name: "houseNumber", nullable: true })
  houseNumber: string;

  @Column({ name: "zipCode", nullable: true })
  zipCode: string;

  @Column({ nullable: true })
  city: string;

  @Column({ name: "serviceCatalogId", nullable: true })
  serviceCatalogId: number;
}

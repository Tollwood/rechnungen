import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "service_catalog" })
export class ProductCatalog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;
}

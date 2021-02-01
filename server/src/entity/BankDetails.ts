import { Column } from "typeorm";

export default class BankDetails {
  @Column()
  bankName: String;
  @Column()
  iban: String;
  @Column()
  bic: String;
}

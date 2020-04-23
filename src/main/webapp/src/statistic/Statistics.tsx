import moment, {Moment} from "moment";

export default class Statistik {
    date: Moment = moment();
    billed: number = 0;
    billedUi: string= "";
    billedCount: number= 0;
    paid: number= 0;
    paidCount: number= 0;
    paidUi: string= "";
    name: string ="";
}
import {Moment} from "moment";

export default interface Statistik {
    date: Moment,
    billed?: number
    billedUi?: string
    billedCount?: number,
    paid?: number
    paidCount?: number
    paidUi?: string
    name?: string
}
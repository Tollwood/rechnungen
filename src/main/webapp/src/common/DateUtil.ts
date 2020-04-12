export class DateUtil{

    static tomorrowAsString() {
        let tomorrow = new Date();
        tomorrow.setDate(new Date().getDate() + 1);
        let dd = String(tomorrow.getDate()).padStart(2, '0');
        let mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = tomorrow.getFullYear();
        return dd + '.' + mm + '.' + yyyy;
    }

    static isSundayOrder(date: string | undefined): boolean{

        if( date === undefined ){
            return false;
        }
        let from = date.split(".");
        var f: Date = new Date( parseInt(from[2]), parseInt(from[1]) - 1, parseInt(from[0]));
        return f.getDay() === 0;
    }

    static stringToDate(date:string): Date {
        let from = date.split(".");
        return  new Date( parseInt(from[2]), parseInt(from[1]) - 1, parseInt(from[0]));
    }

    static isNextDay(current: Date, verifyNextDate: Date) {
        let nextDay = new Date();
        nextDay.setDate(current.getDate() +1);
        return  nextDay.getFullYear() === verifyNextDate.getFullYear() && nextDay.getMonth() === verifyNextDate.getMonth() && nextDay.getDay() === verifyNextDate.getDay();
    }
}
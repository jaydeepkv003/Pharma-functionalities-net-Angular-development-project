import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'daysRemaining' })
export class DaysRemainingPipe implements PipeTransform {
    constructor() { }
    transform(date: Date) {
        let currentDate = new Date();
        date = new Date(date);
        return Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) / (1000 * 60 * 60 * 24));
    }
}

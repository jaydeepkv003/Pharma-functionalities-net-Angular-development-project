import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'stringToNumber' })
export class StringToNumberPipe implements PipeTransform {
  constructor() { }
  transform(value: string) {
    if (value && value != null && value != '' && !isNaN(+value)) {
      return +value;
    } else {
      return value;
    }
  }
}

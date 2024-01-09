import { Pipe, PipeTransform } from "@angular/core";
import * as _ from 'lodash';

@Pipe({
  name: "orderBy"
})
export class OrderByPipe implements PipeTransform {
  transform(array: any, field: string): any[] {
    let x = field.split('.');
    array.sort((a: any, b: any) => {
      a = _.get(a, x);
      b = _.get(b, x);
      if (a && b) {
        a = a.toLowerCase();
        b = b.toLowerCase();
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    return array;
  }
}

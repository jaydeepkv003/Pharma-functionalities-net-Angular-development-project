import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'arrayToString' })
export class ArrayToStringPipe implements PipeTransform {
    constructor() { }
    transform(arr: Array<any>, prop: string) {
        if (prop) {
            let propArray = arr.map(a => a[prop]);
            return propArray.join(', ');
        }else{
            return arr.join(', ');
        }
    }
}

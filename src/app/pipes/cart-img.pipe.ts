import { Pipe, PipeTransform } from '@angular/core';
// import { AttributesViewModel } from '../api/phr-webapi/models';
@Pipe({ name: 'cartImg' })
export class CartImgPipe implements PipeTransform {
    constructor() { }
    transform(attributes: Array<any>, prop: number = 175) {
        if (attributes) {
            let attr = attributes.filter(x => x.AttributeID === prop)[0];
            if (attr) {
                return attr.Values[0].Value;
            }
        }
        return null;
    }
}

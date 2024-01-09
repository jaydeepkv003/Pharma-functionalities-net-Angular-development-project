import { Pipe, PipeTransform } from '@angular/core';
// import { AttributesViewModel } from '../api/phr-webapi/models';
@Pipe({ name: 'attributePattern' })
export class AttributePatternPipe implements PipeTransform {
    constructor() { }
    transform(attributes: Array<any>, attrDetail: any) {
        if (attributes && attributes.length > 0) {
            if (attrDetail.AttributePattern) {
                var pattern = /\[(.*?)\]/g;
                let returnVal: string = attrDetail.AttributePattern;
                var match;
                while ((match = pattern.exec(attrDetail.AttributePattern)) != null) {
                    let AttributeID = match[1];
                    let val = this.getAttributeValue(attributes, parseInt(AttributeID));
                    if (!val) {
                        return null;
                    }
                    returnVal = returnVal.replace(`[${AttributeID}]`, val);
                }
                return returnVal;
            }
        }
        return null;
    }

    getAttributeValue(attributes: Array<any>, AttributeID: number) {
        let attr = attributes.filter(x => x.AttributeID === AttributeID)[0];
        if (attr) {
            const val = attr.Values[0].Value;
            if (isNaN(val)) {
                return val;
            } else {
                return parseFloat(val);
            }
        }
    }
}

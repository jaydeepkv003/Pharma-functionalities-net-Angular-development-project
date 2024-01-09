import {​​​​​​​​ Directive, ElementRef, HostListener, Input }​​​​​​​​ from '@angular/core';
@Directive({​​​​​​​​
    selector: '[maxLen]'
}​​​​​​​​)
export class MaxLengthDirective {​​​​​​​​
    @Input('maxLen') maxLength: number;
    @Input('isNumericOnly') isNumericOnly: boolean;
    constructor(private _el: ElementRef) {​​​​​​​​ }​​​​​​​​
    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this._el.nativeElement.value;
        if (this.isNumericOnly) {​​​​​​​​
            this._el.nativeElement.value = initalValue.replace(/[^0-9.]*/g, '');
            if (Number(this._el.nativeElement.value) === 0) {​​​​​​​​
                this._el.nativeElement.value = '';
            }​​​​​​​​
        }
        if (this._el.nativeElement.value.length > this.maxLength) {​​​​​​​​
            this._el.nativeElement.value =  this._el.nativeElement.value.substring(0,this.maxLength);
        }​​​​​​​​
        if (initalValue !== this._el.nativeElement.value) {​​​​​​​​
            event.stopPropagation();
        }​​​​​​​​
    }​​​​​​​​
}​​​​​​​​

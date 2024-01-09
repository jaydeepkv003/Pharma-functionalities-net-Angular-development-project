import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[OnlyNumeric]'
})
export class OnlyNumericDirective {

    constructor(private _el: ElementRef) { }

    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this._el.nativeElement.value;

        this._el.nativeElement.value = initalValue.replace(/[^0-9.]*/g, '');
        if (Number(this._el.nativeElement.value) === 0) {
            this._el.nativeElement.value = '';
        }
        if (initalValue !== this._el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}
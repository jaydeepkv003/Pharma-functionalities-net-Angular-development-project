import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: "[OpenChat]"
})
export class OpenChatDirective {
  @HostListener('click', ['$event']) onOpenChat() {
      const element = document.getElementById(
        'comm100-button-4666'
      ) as HTMLElement;
      const iframe = element.firstElementChild;
      const innerDoc = iframe['contentDocument']
        ? iframe['contentDocument']
        : iframe['contentWindow'].document;
      const elementx = innerDoc.querySelectorAll('.chatButton');
      if (elementx && elementx.length) {
        elementx[0].click();
      }
  }
}

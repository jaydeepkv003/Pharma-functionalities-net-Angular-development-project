import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[genericLink]'
})
export class GenericLinkDirective {
  @Input('genericLink') link: any;
  constructor(private router: Router) { }
  @HostListener('click', ['$event']) navigate() {
    console.log(this.link);
    if (this.link) {
      if (this.link.linkType === 'external') {
        if (this.link.target === '_blank') {
          window.open(this.link.url, this.link.target);
        } else {
          window.location.href = this.link.url;
        }
      } else {
        this.router.navigateByUrl(this.link.url);
      }
    }
  }
}

import { Component, Input } from '@angular/core';
import { LayoutServiceContextData } from '@sitecore-jss/sitecore-jss';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  @Input() errorContextData: LayoutServiceContextData;
  origin: string;

  ngOnInit() {
    this.origin = '';
    if (window.location.origin.indexOf('localhost') > -1) {
      this.origin = 'https://dev.phenpreview2.com';
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-corporate-banner-control',
  templateUrl: './corporate-banner-control.component.html',
  styleUrls: ['./corporate-banner-control.component.scss']
})
export class CorporateBannerControlComponent implements OnInit {
  @Input() rendering: ComponentRendering;

  constructor() { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('CorporateBannerControl component initialized with component data', this.rendering);
  }
}

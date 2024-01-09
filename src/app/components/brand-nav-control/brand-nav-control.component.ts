import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-brand-nav-control',
  templateUrl: './brand-nav-control.component.html',
  styleUrls: ['./brand-nav-control.component.scss']
})
export class BrandNavControlComponent implements OnInit {
  @Input() rendering: ComponentRendering;

  constructor() { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('brand-nav-control component initialized with component data', this.rendering);
  }
}

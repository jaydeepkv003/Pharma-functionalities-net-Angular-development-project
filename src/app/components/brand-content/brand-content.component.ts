import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-brand-content',
  templateUrl: './brand-content.component.html',
  styleUrls: ['./brand-content.component.scss']
})
export class BrandContentComponent implements OnInit {
  @Input() rendering: ComponentRendering;

  constructor() { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('brand-content component initialized with component data', this.rendering);
  }
}

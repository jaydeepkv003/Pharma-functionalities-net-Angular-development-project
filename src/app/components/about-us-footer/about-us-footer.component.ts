import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-about-us-footer',
  templateUrl: './about-us-footer.component.html',
  styleUrls: ['./about-us-footer.component.scss']
})
export class AboutUsFooterComponent implements OnInit {
  @Input() rendering: ComponentRendering;

  constructor() { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('AboutUsFooter component initialized with component data', this.rendering);
  }
}

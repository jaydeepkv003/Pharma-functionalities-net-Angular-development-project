import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-how-it-works-tab',
  templateUrl: './how-it-works-tab.component.html',
  styleUrls: ['./how-it-works-tab.component.css']
})
export class HowItWorksTabComponent implements OnInit {
  @Input() rendering: ComponentRendering;

  constructor() { }

  ngOnInit() {
  }
}

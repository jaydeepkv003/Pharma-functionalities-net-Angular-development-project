import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-sub-tab',
  templateUrl: './sub-tab.component.html',
  styleUrls: ['./sub-tab.component.scss']
})
export class SubTabComponent implements OnInit {
  @Input() rendering: ComponentRendering;

  constructor() { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('sub-tab component initialized with component data', this.rendering);
  }
}

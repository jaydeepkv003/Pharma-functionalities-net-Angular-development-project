import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-tools-splash-option',
  templateUrl: './tools-splash-option.component.html',
  styleUrls: ['./tools-splash-option.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class ToolsSplashOptionComponent implements OnInit {
  @Input() rendering: ComponentRendering;

  constructor() { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('tools-splash-option component initialized with component data', this.rendering);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-tools-splash',
  templateUrl: './tools-splash.component.html',
  styleUrls: ['./tools-splash.component.scss']
})
export class ToolsSplashComponent implements OnInit {
  @Input() rendering: ComponentRendering;

  constructor() { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('tools-splash component initialized with component data', this.rendering);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-content-block-thirteen',
  templateUrl: './content-block-thirteen.component.html',
  styleUrls: ['./content-block-thirteen.component.scss']
})
export class ContentBlockThirteenComponent implements OnInit {
  @Input() rendering: ComponentRendering;

  constructor() { }

  ngOnInit() {
  }
}

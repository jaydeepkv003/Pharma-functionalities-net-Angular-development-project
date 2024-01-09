import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-be-happy',
  templateUrl: './be-happy.component.html',
  styleUrls: ['./be-happy.component.scss']
})
export class BeHappyComponent implements OnInit {
  @Input() rendering: ComponentRendering;

  constructor() { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('be-happy component initialized with component data', this.rendering);
  }
}

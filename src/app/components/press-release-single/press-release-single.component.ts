import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-press-release-single',
  templateUrl: './press-release-single.component.html',
  styleUrls: ['./press-release-single.component.scss']
})
export class PressReleaseSingleComponent implements OnInit {
  @Input() rendering: ComponentRendering;

  constructor() { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('press-release-single component initialized with component data', this.rendering);
  }
}

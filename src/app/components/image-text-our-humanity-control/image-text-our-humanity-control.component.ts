import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-image-text-our-humanity-control',
  templateUrl: './image-text-our-humanity-control.component.html',
  styleUrls: ['./image-text-our-humanity-control.component.scss']
})
export class ImageTextOurHumanityControlComponent implements OnInit {
  @Input() rendering: ComponentRendering;

  constructor() { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('ImageTextOurHumanityControl component initialized with component data', this.rendering);
  }
}

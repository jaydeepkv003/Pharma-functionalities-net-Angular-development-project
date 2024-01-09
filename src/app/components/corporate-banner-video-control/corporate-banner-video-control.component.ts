import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-corporate-banner-video-control',
  templateUrl: './corporate-banner-video-control.component.html',
  styleUrls: ['./corporate-banner-video-control.component.scss']
})
export class CorporateBannerVideoControlComponent implements OnInit {
  @Input() rendering: ComponentRendering;

  videoSourceURL: any;

  constructor() { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('corporate-banner-video-control component initialized with component data', this.rendering);
    this.videoSourceURL = this.rendering.fields.videoSourceURL as any;
  }

}

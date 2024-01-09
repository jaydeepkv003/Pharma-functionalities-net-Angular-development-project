import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { isPlatformServer } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-beta-message-popup',
  templateUrl: './beta-message-popup.component.html',
  styleUrls: ['./beta-message-popup.component.scss'],
  animations: [
    trigger('hideBanner', [
      state(
        'close',
        style({
          display: 'none',
          height: 0,
          padding: 0,
        })
      ),
      transition('* => *', animate(250)),
    ]),
  ],
})
export class BetaMessagePopupComponent {
  @Input() bgColor: string;
  @Input() bannerMessage: string;

  isVisible: boolean;
  animate = 'open';

  constructor(@Inject(PLATFORM_ID) private readonly platformId: string) {
    if (!isPlatformServer(this.platformId)) {
      this.isVisible = !sessionStorage.bannerToggle;
    } else {
      this.isVisible = true;
    }
  }

  messageToggle() {
    this.animate = 'close';
    if (!isPlatformServer(this.platformId)) {
      setTimeout(() => {
        sessionStorage.bannerToggle = false;
        this.isVisible = sessionStorage.bannerToggle;
      }, 250);
    } else {
      this.isVisible = false;
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { CookieService } from '../../_services/cookie.service';

@Component({
  selector: 'app-homepage-banner-modal',
  templateUrl: './homepage-banner-modal.component.html',
  styleUrls: ['./homepage-banner-modal.component.scss']
})
export class HomepageBannerModalComponent implements OnInit {
  @Input() public rendering: ComponentRendering;

  constructor(public activeModal: NgbActiveModal, public cookieService: CookieService) {
  }

  ngOnInit() {
    console.log('homepage-banner-modal component initialized with component data', this.rendering);
  }

}

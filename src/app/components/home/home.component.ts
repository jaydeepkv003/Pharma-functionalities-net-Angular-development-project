import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CookieService } from '../../_services/cookie.service';
import { MessageService } from '../../_services/message.service';
import { SharedService } from '../../_services/shared.service';
import { HomepageBannerModalComponent } from '../homepage-banner-modal/homepage-banner-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  @Input() rendering: ComponentRendering;
  imageSlider: Array<any> = [];
  unsubscribe$: Subject<boolean> = new Subject();
  doNotShow: boolean;

  constructor(
    private sharedService: SharedService,
    private modalService: NgbModal,
    private messageService: MessageService,
    private cookieService: CookieService
  ) {
    this.checkDoNotShowFlag();
  }

  ngOnInit() {
    // remove this after implementation is done
    console.log('home component initialized with component data', this.rendering);
    this.messageService.getMessage().pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (msg) => {
          if (msg) {
            if (msg.featureAmsLoaded) {
              this.managePopupBanner();
            }
          }
        },
        (err) => { }
      );
  }

  managePopupBanner() {
    if (this.sharedService.feature.PopupBanner) {
      if (this.doNotShow) {
        this.doNotShow = false;
        return;
      }
      const modalRef = this.modalService.open(HomepageBannerModalComponent, { size: 'lg', windowClass: 'modal-top', backdropClass: 'backdrop-blue' });
      modalRef.componentInstance.rendering = this.rendering;
      modalRef.result.then(
        (result) => {
          console.log(result);
        },
        (reason) => {
          if (reason === ModalDismissReasons.BACKDROP_CLICK || reason === ModalDismissReasons.ESC || reason === 'closeClick') {
            this.cookieService.setCookie('DoNotShowPopup', new Date().toUTCString(), 1);
          }
      });
    }
  }

  async checkDoNotShowFlag() {
    if (await this.cookieService.getCookie('DoNotShowPopup')) {
      this.doNotShow = true;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }
}

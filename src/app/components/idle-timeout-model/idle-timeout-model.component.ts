import { Component, HostListener, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { Subscription, timer } from 'rxjs';
import { IdleService, Refresh_Key } from '../_core/idle.service';

@Component({
  selector: 'app-idle-timeout-model',
  templateUrl: './idle-timeout-model.component.html',
  styleUrls: ['./idle-timeout-model.component.scss'],
})
export class IdleTimeoutModelComponent implements OnDestroy {
  @Input() rendering: ComponentRendering;
  @Input() set data(isTimer: boolean) {
    this.isTimer = isTimer;
    if (isTimer) {
      this.startTimer();
    }
  }

  countDownSubject: Subscription;
  counter = 0;
  isTimer = true;

  constructor(public activeModal: NgbActiveModal, private idleService: IdleService) { }

  startTimer() {
    this.counter = this.idleService.FinalCountdown * 60;
    //this.storageListener();
    this.countDownSubject = timer(0, 1000).subscribe(() => {
      --this.counter;
      if (this.counter === 0) {
        this.idleService.idleLogOut();
        this.countDownSubject.unsubscribe();
      }
    });
  }

  refreshToken() {
    this.onRefresh();
    this.idleService.refresh();
    this.countDownSubject.unsubscribe();
    this.activeModal.dismiss();
  }

  login() {
    this.idleService.login();
    this.activeModal.dismiss();
  }

  onRefresh(): void {
    const refresh = localStorage.getItem(Refresh_Key);
    const setRefresh = refresh ? String(Number(refresh) + 1) : '1';
    localStorage.setItem(Refresh_Key, setRefresh);
  }

  // private storageListener(): void {
  //   window.addEventListener('storage', this.storageEventListener.bind(this));
  // }

  @HostListener('window:storage', ['$event'])
  private storageEventListener(event: StorageEvent) {
    if (event.storageArea === localStorage) {
      if (event.key === Refresh_Key && event.newValue) {
        this.idleService.refresh();
        this.countDownSubject.unsubscribe();
        this.activeModal.dismiss();
      }
    }
  }

  private removeListener(): void {
    window.removeEventListener('storage', this.storageEventListener);
  }

  ngOnDestroy() {
    this.removeListener();
    this.idleService.isContdownModalOpen = false;
    if (this.countDownSubject) {
      this.countDownSubject.unsubscribe();
    }
    if (!this.isTimer) {
      this.idleService.isIdleLoginModalOpen = false;
      localStorage.removeItem('phr_idle_logout');
    }
  }
}

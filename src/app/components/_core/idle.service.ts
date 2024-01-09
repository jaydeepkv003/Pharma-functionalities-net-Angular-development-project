import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Observable, interval, BehaviorSubject } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment as env } from '../../../environments/environment';

export const Idle_Key = 'phr_idle_time_out';
export const Refresh_Key = 'phr_idle_refresh';

@Injectable({ providedIn: 'root' })

export class IdleService implements OnDestroy {
  public static runTimer: boolean;
  public static runSecondTimer: boolean;
  public IdleTimeout = env.auth.idleTimeoutPeriod - env.auth.sessionTimeoutPopup;
  public FinalCountdown = env.auth.sessionTimeoutPopup;
  public idleUserChecker: BehaviorSubject<string>;

  private sessionForIdle: Observable<number>;

  public clockForIdle: Observable<number>;
  public isContdownModalOpen = false;
  public isIdleLoginModalOpen = false;

  constructor(private zone: NgZone, private authService: AuthService) {
    if (!this.idleUserChecker) {
      this.idleUserChecker = new BehaviorSubject<string>('INITIATE_TIMER');
    }
  }

  public initilizeSessionTimeout(): void {
    IdleService.runTimer = true;
    this.reset();
    this.initInterval();
  }

  get lastAction(): number {
    return parseInt(localStorage.getItem(Idle_Key), 10);
  }

  set lastAction(value) {
    localStorage.setItem(Idle_Key, value.toString());
  }

  public reset(): void {
    this.lastAction = Date.now();
    if (this.idleUserChecker) {
      this.idleUserChecker.next('RESET_TIMER');
    }
  }

  private initInterval(): void {
    const intervalDuration = 1000;
    this.sessionForIdle = interval(intervalDuration).pipe(
      map((tick: number) => {
        return tick;
      }),
      takeWhile(() => IdleService.runTimer)
    );

    this.check();
  }

  private check(): void {
    this.sessionForIdle.subscribe(() => {
      const now = Date.now();
      const timeleft = this.lastAction + this.IdleTimeout * 60 * 1000;
      const diff = timeleft - now;
      const isTimeout = diff < 0;

      this.idleUserChecker.next(`${diff}`);

      if (isTimeout) {
        this.zone.run(() => {
          if (this.idleUserChecker) {
            this.idleUserChecker.next('TIMER_COMPLETE');
          }
          IdleService.runTimer = false;
        });
      }
    });
  }

  public removeIdleFormLocalStorage(): void {
    localStorage.removeItem(Idle_Key);
    localStorage.removeItem(Refresh_Key);
  }

  public idleLogOut(): void {
    localStorage.phr_idle_logout = true;
    this.removeIdleFormLocalStorage();
    this.authService.logout();
  }

  public refresh(): void {
    this.isContdownModalOpen = false;
    this.initilizeSessionTimeout();
  }

  public login(): void {
    this.authService.login();
  }

  ngOnDestroy(): void {
    if (this.idleUserChecker) {
      this.idleUserChecker.unsubscribe();
      this.idleUserChecker = undefined;
    }
  }

}

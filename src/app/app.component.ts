import { Component, HostListener, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { JssContextService } from './jss-context.service';
import { environment as env } from '../environments/environment';
import { Subscription } from 'rxjs';
import { AuthService } from './components/_core/auth.service';
import { AMSService } from './_services/ams.service';
import { isPlatformServer } from '@angular/common';
import { IdleService } from './components/_core/idle.service';

export const Idle_Key = 'phr_idle_time_out';
export const Refresh_Key = 'phr_idle_refresh';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  private contextSubscription: Subscription;
  private amsSubscription: Subscription;


  constructor(translate: TranslateService,
    private jssContextService: JssContextService,
    private amsService: AMSService,
    @Inject(PLATFORM_ID) private readonly platformId: string,
    private authService: AuthService,
    private idleService: IdleService) {

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(env.defaultLanguage);

    // the lang to use. if the lang isn't available, it will use the current loader to get them
    translate.use(env.defaultLanguage);

    this.contextSubscription = this.jssContextService.state.subscribe(jssState => {
      // listen for language changes
      if (jssState.language) {
        translate.use(jssState.language);
      }
    });

    console.log('>>> App running in ' + env.mode + ' mode..');

    if (!isPlatformServer(this.platformId)) {
      console.log('Client Platform');
      this.amsSubscription = this.amsService.getFeatureFlags().subscribe(x => {
        console.log('Configuration loaded');
      }, err => {
        console.log('Error in loading configuration', err);
      });

    } else {
      console.log('Server Platform');
    }
    this.authService.runInitialSequence();
  }

  @HostListener('mousemove', ['$event'])
  @HostListener('mousedown', ['$event'])
  @HostListener('scroll', ['$event'])
  @HostListener('keydown', ['$event'])
  handleUserActiveState(event): void {
    this.idleService.reset();
  }

  @HostListener('window:storage', ['$event'])
  onLoginLogout(event: StorageEvent) {
    if (event.storageArea === localStorage) {
      if (event.key === 'id_token') {
        if (!event.newValue) {
          this.removeIdleFormLocalStorage();
        }
        window.location.reload();
      }
    }
  }

  public removeIdleFormLocalStorage(): void {
    localStorage.removeItem(Idle_Key);
    localStorage.removeItem(Refresh_Key);
  }

  ngOnDestroy() {
    if (this.contextSubscription) {
      this.contextSubscription.unsubscribe();
    }
    if (this.amsSubscription) {
      this.amsSubscription.unsubscribe();
    }
  }

  public loadJsFile(url) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}

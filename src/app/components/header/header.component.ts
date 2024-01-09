import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentRendering, isExperienceEditorActive } from '@sitecore-jss/sitecore-jss-angular';
import { ApolloQueryResult } from 'apollo-client';
import { DocumentNode } from 'graphql';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CartViewModel } from '../../api/phr-webapi/models';
import { MessageModel } from '../../models/common-models';
import { CartService, WebUserService } from '../../api/phr-webapi/services';
import { JssGraphQLService } from '../../jss-graphql.service';
import { LANGUAGE_LIST } from '../../models/constants';
import { MessageService } from '../../_services/message.service';
import { SharedService } from '../../_services/shared.service';
import { RegisterSigninModalComponent } from '../register-signin-modal/register-signin-modal.component';
import { AuthService } from '../_core/auth.service';
import { IdleTimeoutModelComponent } from './../idle-timeout-model/idle-timeout-model.component';
import { IdleService } from './../_core/idle.service';
import { TranslationService } from '../../_services/translation.service';
// import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const ComponentQuery: DocumentNode = require('graphql-tag/loader!./header.component.graphql');

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() rendering: ComponentRendering;
  query$: Observable<ApolloQueryResult<any>>;
  @ViewChild("scrollTarget", { static: false }) scrollTarget: ElementRef;

  contextSubscription: Subscription;
  messageSubscription: Subscription;
  onIdleSubscription: Subscription;

  username: string;
  isAuthenticated = false;
  cartItemCount: number;
  cartDetails: CartViewModel = null;
  cartDetail: CartViewModel = null;
  showCartMenu: boolean = false;

  productsToggle = false;
  webinarsToggle = false;
  applicationsToggle = false;
  lang = 'en';

  topMenus: any[] = [];
  isExpEditorActive: boolean = false;
  level1Menu: any = null;
  showlevel1Menu: boolean = false;
  level2Menu: any = null;
  accountMenus = [];
  accountMenu: any = null;
  showAccountMenu: boolean = false;
  expEditor: boolean = false;
  LANGUAGE_LIST = LANGUAGE_LIST;
  selectedLang = LANGUAGE_LIST[0];

  menuCtrlSub: Subscription;
  modelChanged: Subject<any> = new Subject<any>();

  constructor(
    private graphQLService: JssGraphQLService,
    private authService: AuthService,
    private cartService: CartService,
    private webUserService: WebUserService,
    private router: Router,
    private modalService: NgbModal,
    private messageService: MessageService,
    public sharedService: SharedService,
    private idleService: IdleService,
    private translationService: TranslationService
  ) {
    this.menuCtrlSub = this.modelChanged
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((newValue) => {
        this.applyMenuChange(newValue);
      });
  }

  ngOnInit() {
    this.isExpEditorActive = isExperienceEditorActive();
    if (!this.isExpEditorActive) {
      this.expEditor = true;
      if (this.authService.hasValidToken()) {
        this.isAuthenticated = true;
        this.getCartTotal();
        this.getUserDetail();
      } else {
        this.isAuthenticated = false;
      }
    } else {
      console.log('>>> Experience Editor is Active.');
    }

    this.messageSubscription = this.messageService.getMessage().subscribe(
      (msg) => {
        if (msg) {
          if (msg.showAuthPopup) {
            this.showAuthPopup(msg);
          }
          if (msg.checkForCartUpdate) {
            this.getCartTotal();
          }
          if (msg.featureAmsLoaded) {
            this.accountMenus = this.sharedService.loadAccountMenu();
          }
        }
      },
      (err) => { }
    );

    this.loadMenu();
    this.translationService.loadValidationMessages();
    this.accountMenus = this.sharedService.loadAccountMenu();
    this.lang = this.getLanguage();

    this.processIdle();
  }

  loadMenu() {
    this.query$ = this.graphQLService.query({ query: ComponentQuery });
    this.query$.subscribe(
      (x) => {
        this.topMenus = x.data.item.children;
        this.topMenus.sort((a, b) => a.orderNumber.value.localeCompare(b.orderNumber.value));
        this.messageService.sendMessage({ topMenus : this.topMenus })
      },
      (err) => console.log(err)
    );
  }

  menuNavigate(menu: any) {
    if (menu.targetlink && menu.targetlink.url) {
      this.closeMenu();

      if (menu.targetlink.linkType === 'external') {
        if (menu.targetlink.target === '_blank') {
          window.open(menu.targetlink.url, menu.targetlink.target);
        } else {
          window.location.href = menu.targetlink.url;
        }
      } else {
        this.router.navigateByUrl(menu.targetlink.url);
      }
    } else if (menu.targetlink && menu.targetlink.event) {
      this.logout();
    }
  }

  toggleMenu(level: number, menu: any, children: any[]) {
    this.modelChanged.next({
      level: level,
      menu: menu,
      children: children
    });
  }

  applyMenuChange(newValue) {
    const menu = newValue.menu;
    if (!menu || (menu && this.level1Menu && menu.title && menu.title.value === this.level1Menu.title.value)) {
      // enableBodyScroll(this.scrollTarget.nativeElement);
      return;
    }

    if (menu.children) {
      menu.children.sort((a, b) => Number(a.orderNumber.value) - (Number(b.orderNumber.value)));
    }

    // disableBodyScroll(this.scrollTarget.nativeElement);
    switch (newValue.level) {
      case -2:
        this.level2Menu = null;
        this.showlevel1Menu = false;
        this.level1Menu = null;
        this.showAccountMenu = false;
        this.accountMenu = null;
        this.showCartMenu = true;
        this.cartDetail = menu;
        break;
      case -1:
        this.level2Menu = null;
        this.showlevel1Menu = false;
        this.level1Menu = null;
        this.showAccountMenu = true;
        this.accountMenu = menu;
        this.showCartMenu = false;
        this.cartDetail = null;
        break;
      case 0:
        this.showAccountMenu = false;
        this.accountMenu = null;
        this.showCartMenu = false;
        this.cartDetail = null;

        this.showlevel1Menu = true;
        this.level1Menu = menu;
        this.level2Menu = null;
        if (menu.children && menu.children.length) {
          this.level2Menu = menu.children[0];
          this.level2Menu.children.sort((a, b) => Number(a.orderNumber.value) - (Number(b.orderNumber.value)));
        }
        break;
      case 1:
        this.showAccountMenu = false;
        this.accountMenu = null;
        this.showlevel1Menu = true;
        this.level2Menu = menu;
        break;
    }
  }

  closeMenu() {
    this.showlevel1Menu = false;
    this.modelChanged.next({
      level: null,
      menu: null,
      menus: []
    });

    setTimeout(() => {
      if (!this.showlevel1Menu && !this.showlevel1Menu) {
        this.level1Menu = null;
        this.level2Menu = null;
      }
    }, 400);
  }

  closeAccountMenu() {
    this.showAccountMenu = false;
    this.modelChanged.next({
      level: null,
      menu: null,
      menus: []
    });

    setTimeout(() => {
      if (!this.showAccountMenu) {
        this.accountMenu = null;
      }
    }, 400);
  }

  closeCartMenu() {
    this.showCartMenu = false;
    this.modelChanged.next({
      level: null,
      menu: null,
      menus: []
    });

    setTimeout(() => {
      if (!this.showCartMenu) {
        this.cartDetail = null;
      }
    }, 400);
  }

  onLanguageChange(selectedValue: any) {
    this.selectedLang = selectedValue;
    let langCode = selectedValue.id;

    let a = document.createElement('a');
    a.href = document.location.href;
    let paths = a.pathname.split('/');

    paths.shift();

    if (paths[0].length == 2 || paths[0].length == 5) {
      paths[0] = langCode;
    } else {
      paths.unshift(langCode);
    }

    this.router.navigateByUrl(paths.join('/') + (a.search != '' ? a.search : '') + (a.hash != '' ? a.hash : ''));
  }

  getLanguage() {
    const url = window.location.href;
    const paths = url.split('/');
    if (paths.indexOf('es-mx') > -1) {
      return 'es-mx';
    }
    return 'en';
  }

  login() {
    this.authService.login(this.router.url);
  }

  public logout() {
    this.idleService.removeIdleFormLocalStorage();
    this.authService.logout();
  }

  get claim() {
    return this.authService.identityClaims;
  }

  getCartTotal() {
    this.cartDetails = null;
    this.contextSubscription = this.cartService.v12CartGet().subscribe(
      (res) => {
        this.cartItemCount = 0;
        this.cartDetails = res;

        this.cartDetails.Parts.forEach((item) => {
          this.cartItemCount += item.Quantity;
        });

        this.cartDetails.Quotes.forEach((quote) => {
          let quoteQty = 0;
          quote.QuoteHeader.Details.map((x) => x.Quantity).forEach((qty) => {
            quoteQty += qty;
          });
          this.cartItemCount += quoteQty * quote.Quantity;
        });
      },
      (err) => { }
    );
  }

  getUserDetail() {
    this.webUserService.v12WebUserGet().subscribe((res) => {
      this.username = res.FirstName;
      this.sharedService.user = res;
      if (this.username.length > 15) {
        this.username = this.username.substr(0, 15) + '...';
      }
    }, (err) => {
      console.log(err);
    });
  }

  showAuthPopup(msg: MessageModel) {
    const modalRef = this.modalService.open(RegisterSigninModalComponent);
    modalRef.componentInstance.route = msg.route;
    modalRef.componentInstance.payload = msg.payload;
  }

  processIdle(): void {
    this.checkIfIdleLogout();
    if (this.isAuthenticated) {
      this.idleService.initilizeSessionTimeout();
      this.idleService.idleUserChecker.subscribe((status: string) => {
        if (status === 'TIMER_COMPLETE' && !this.idleService.isContdownModalOpen) {
          this.idleService.isContdownModalOpen = true;
          const modalRef = this.modalService.open(IdleTimeoutModelComponent, { backdrop: 'static' });
          modalRef.componentInstance.data = true;
        }
      });
    }
  }

  checkIfIdleLogout(): void {
    if (localStorage.phr_idle_logout && !this.isAuthenticated && !this.idleService.isIdleLoginModalOpen) {
      this.idleService.isIdleLoginModalOpen = true;
      const modalRef = this.modalService.open(IdleTimeoutModelComponent);
      modalRef.componentInstance.data = false;
    }
  }

  isNoHover(title: string) {
    if (title && title.toLowerCase().indexOf('keyboard_arrow_right') > -1) {
      return true;
    }
    return false;
  }

  isLinkConfigured(menu: any) {
    if (menu.targetlink && menu.targetlink.url) {
      return true;
    }
    return false;
  }

  ngOnDestroy(): void {
    if (this.contextSubscription) {
      this.contextSubscription.unsubscribe();
    }
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    if (this.menuCtrlSub) {
      this.menuCtrlSub.unsubscribe();
    }
  }
}

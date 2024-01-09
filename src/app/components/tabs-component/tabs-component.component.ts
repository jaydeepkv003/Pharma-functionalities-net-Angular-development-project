import { Component, Input, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ComponentRendering,
  getChildPlaceholder,
} from '@sitecore-jss/sitecore-jss-angular';
import { Subscription } from 'rxjs';
import { MessageService } from '../../_services/message.service';
import { JssContextService } from '../../jss-context.service';

/**
 * Demonstrates advanced component techniques in JSS.
 * This example implements a simple-looking tabs component.
 * Each tab is itself a child component added to a placeholder defined on the tabs component.
 * The tab component introspects its child components to render the tab headings (i.e. the tab children render partial content in two places).
 * When this component is edited in Sitecore Experience Editor, the tabbing behavior is turned off and each tab stacks on top of each other
 * for easy inline editing.
 */
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs-component.component.html',
  styleUrls: ['./tabs-component.component.scss'],
})
export class TabsComponentComponent implements OnInit, OnDestroy {
  @ViewChild('tabControl', { static: false }) tabControl: ElementRef;
  @Input() rendering: ComponentRendering;
  tabType: string;
  tabs: ComponentRendering[];
  activeTab: ComponentRendering;
  isEditing = false;
  activeTabUrl;
  private subscriptions: Subscription[] = [];
  messageSubscription: Subscription;

  constructor(
    private jssContext: JssContextService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    console.log(this.rendering);
    // to get access to route-level data from Sitecore such as route item fields or
    // whether the page is in edit or preview display modes, you can subscribe
    // to the JSS context service. See styleguide-sitecore-context for more details.
    // Don't forget to unsubscribe in ngOnDestroy() when using the subscription to avoid resource issues.
    this.subscriptions.push(
      this.jssContext.state.subscribe((newState) => {
        this.isEditing =
          newState.sitecore && newState.sitecore.context.pageEditing;
      })
    );

    this.subscriptions.push(
      this.activatedRoute.fragment.subscribe((params: any) => {
        this.activeTabUrl = params;
        this.update();
      })
    );

    this.messageSubscription = this.messageService.getMessage().subscribe(
      (msg) => {
        if (msg && msg.checkForTabScroll && this.activeTabUrl) {
          this.scrollTop();
        }
      },
      (err) => { }
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  update() {
    this.tabType = this.rendering.fields && this.rendering.fields.tabType ? this.rendering.fields.tabType['value'] : '';
    this.tabs = getChildPlaceholder(this.rendering, 'jss-tabs').filter(
      (tab: ComponentRendering) => tab.fields
    ) as ComponentRendering[];
    if (this.tabs.length > 0) {
      const index = this.tabs.findIndex((d) =>
        this.caseInsensitiveCompare(this.getNameFromTab(d), this.activeTabUrl)
      );
      if (this.activeTabUrl && index >= 0) {
        this.scrollTop();
      }
      if (!this.activeTab) {
        this.activeTab = this.tabs[index > 0 ? index : 0];
      }
    }
  }

  caseInsensitiveCompare(value, compare): boolean {
    return value && compare && value.toLowerCase() === compare.toLowerCase();
  }

  scrollTop() {
    setTimeout(() => {
      if (this.tabControl.nativeElement.offsetTop > 0) {
        const distance = this.tabControl.nativeElement.offsetTop - (this.tabControl.nativeElement.scrollTop - 10);
        window.scrollTo({ top: distance, behavior: 'smooth' });
      }
    }, 100);
  }

  onTabChange(tab: any) {
    this.router.navigate([], {
      fragment: this.getNameFromTab(tab).toLowerCase()
    });
  }

  getNameFromTab(tab: any) {   
    var title;
    if(typeof tab.fields.title != 'undefined')
    {
      title = tab.fields.title && tab.fields.title.value
      ? tab.fields.title.value
      : tab.fields.title;
    }
    else  if(typeof tab.fields.heading != 'undefined'){
      title = tab.fields.heading && tab.fields.heading.value
      ? tab.fields.heading.value
      : tab.fields.heading;
    }  
    return title;
  }
}

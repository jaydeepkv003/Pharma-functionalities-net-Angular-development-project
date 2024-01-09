import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentRendering, getChildPlaceholder } from '@sitecore-jss/sitecore-jss-angular';
import { Subscription } from 'rxjs';
import { JssContextService } from '../../jss-context.service';

@Component({
  selector: 'app-workflow-tab',
  templateUrl: './workflow-tab.component.html',
  styleUrls: ['./workflow-tab.component.scss']
})
export class WorkflowTabComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  tabs: any[];
  activeTab: any;
  private subscriptions: Subscription[] = [];
  cindex: number = 0;
  selectedIndex: number = 0;
  isEditing = false;

  constructor(
    private jssContext: JssContextService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.jssContext.state.subscribe((newState) => {
        this.isEditing =
          newState.sitecore && newState.sitecore.context.pageEditing;
      })
    );

    this.subscriptions.push(
      this.activatedRoute.fragment.subscribe((params: any) => {
        this.update();
      })
    );
  }

  update() {
    this.tabs = getChildPlaceholder(this.rendering, 'jss-sub-tabs').filter(
      (tab: ComponentRendering) => tab.fields
    ) as ComponentRendering[];
    if (this.tabs.length > 0) {
      this.tabs.forEach(tab => {
        tab.state = 'right';
      });
      this.tabs[0].state = 'active';
      this.activeTab = this.tabs[0];
    }
  }

  caseInsensitiveCompare(value, compare): boolean {
    return value && compare && value.toLowerCase() === compare.toLowerCase();
  }

  onTabChange(tab: any) {
    this.router.navigate([], {
      fragment: this.getNameFromTab(tab).toLowerCase()
    });
  }

  getNameFromTab(tab: any) {
    return tab.fields.title && tab.fields.title.value
      ? tab.fields.title.value
      : tab.fields.title;
  }

  selectTab(index: number) {
    if (this.cindex > index) {
      this.tabs[this.cindex].state = 'right';
      this.cindex = this.cindex - 1;
      this.tabs[this.cindex].state = 'active';
      this.activeTab = this.tabs[this.cindex];
      this.selectTab(index);
    } else if (this.cindex < index) {
      this.tabs[this.cindex].state = 'left';
      this.cindex = this.cindex + 1;
      this.tabs[this.cindex].state = 'active';
      this.activeTab = this.tabs[this.cindex];
      this.selectTab(index);
    } else {
      setTimeout(() => {
        this.selectedIndex = index;
      }, 600);
    }
  }

}

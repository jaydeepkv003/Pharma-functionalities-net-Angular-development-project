import { Component, OnInit, Input, OnDestroy, NgModule } from '@angular/core';
import { Field, ComponentRendering, JssModule } from '@sitecore-jss/sitecore-jss-angular';

import { JssContextService } from '../../jss-context.service';
import { Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { TABS } from './tab-models';

@Component({
  selector: 'app-tabs-tab-component',
  templateUrl: './tabs-tab-component.component.html',
})

@NgModule({
  imports: [
    // secret sauce
    JssModule.forChild(HeaderComponent)
  ],
  declarations: [
    HeaderComponent,
  ],
})

export class TabsTabComponentComponent implements OnInit, OnDestroy {
  @Input() rendering: ComponentRendering;
  private contextSubscription: Subscription;

  contextFields: { [name: string]: Field };
  TABS = TABS;
  isEditing = false;
  isOthersTab: boolean = false;
  searchText = "";
  brandId = "";
  TabListName = "";
  templateName: string;

  brandProductId: number;
  techniqueId: number;

  constructor(private jssContext: JssContextService) { }

  ngOnInit() {
    this.contextSubscription = this.jssContext.state.subscribe((newState) => {
      this.searchText = newState.sitecore.route.name;
      this.brandId = newState.sitecore.route.itemId.toLowerCase().replace(/-/g, '');

      this.templateName = newState.sitecore.route.templateName;
      this.brandProductId = newState.sitecore.route.fields.brandId.value as number;
      this.techniqueId = newState.sitecore.route.fields.techniqueId.value as number;

      this.TabListName = (this.rendering.fields.TabList as any).value;
      console.log("TabList Name", this.TabListName);
    });
  }

  ngOnDestroy() {
    if (this.contextSubscription) {
      this.contextSubscription.unsubscribe();
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { JssContextService } from '../../jss-context.service';
import { Field, ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-brand-application-component',
  templateUrl: './brand-application-component.component.html',
  styleUrls: ['./brand-application-component.component.scss']
})
//export class BrandApplicationComponentComponent implements OnInit, OnDestroy {
export class BrandApplicationComponentComponent implements OnInit {
@Input() rendering: ComponentRendering;

  contextFields: { [name: string]: Field };
  private contextSubscription: Subscription;
  constructor(private jssContext: JssContextService) { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('brand-application-component component initialized with component data', this.rendering);

    this.contextSubscription = this.jssContext.state.subscribe((state) => {
      this.contextFields = state.sitecore.route.fields;
    });

    // console.log('Context Fields applicationList : ', this.contextFields.applicationList);
     console.log('Context Subscription : ', this.contextSubscription);   
    // console.log('Context Fields Heading : ', this.contextFields.applicationList[0].fields.heading);
  }
}

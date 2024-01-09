import { Component, OnInit, Input } from '@angular/core';
import { Field, ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { JssContextService } from '../../jss-context.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-press-release-year-control',
  templateUrl: './press-release-year-control.component.html',
  styleUrls: ['./press-release-year-control.component.scss']
})

export class PressReleaseYearControlComponent implements OnInit {
  @Input() rendering: ComponentRendering;

  contextFields: { [name: string]: Field };
  activeYear: any = []
  resultCollection: [];
  isEditing = false;
  APIEndpoint :any;
  currentYear= "";
  private contextSubscription: Subscription;

  constructor(private jssContext: JssContextService, private http: HttpClient) { }

  yearsCollection: []
  currentHostName: string = environment.sitecoreApiHost;

  ngOnInit() {
    // remove this after implementation is done
    console.log('PressReleaseYearControl component initialized with component data', this.rendering);

    this.contextSubscription = this.jssContext.state.subscribe((newState) => {
      this.currentYear = newState.sitecore.route.name;
    });

    console.log('Context Subscription for PressReleaseYearControl : ', this.contextSubscription);
    //var search = "";

    var query = `{
      item(path: "/sitecore/content/Sandbox/phrjss/home/About-Us/News/Press-Release") {
        id
        hasChildren
        children {
          name
        }
      }
    }`

    var url = `${environment.graphQLEndpoint}&query=${query}`

    this.http.get(url).subscribe((res: any) => {
      var myArray = res.data.item.children;
      this.yearsCollection =  myArray.splice(1, myArray.length -1 ).reverse();
      console.log("this.currentYear in Year Control=", this.currentYear);

      this.yearsCollection.forEach( element => {
        //console.log("element=", element);
        var tempYearName = element as any;

        if(tempYearName != null &&  tempYearName.name == this.currentYear)
        {
          this.activeYear.push("active")
        }
        else
        {
          this.activeYear.push("")
        }
      })

      console.log("this.activeYear array=", this.activeYear);

    }
    )
  }

  // ngOnDestroy() {
  //   if (this.contextSubscription) {
  //     this.contextSubscription.unsubscribe();
  //   }
  // }
  IsActiveYear(index) {
    console.log("this.activeYear[index]=", this.activeYear[index]);
    this.activeYear[index];
  }
}



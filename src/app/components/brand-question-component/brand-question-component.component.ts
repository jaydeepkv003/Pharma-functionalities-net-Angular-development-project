import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { JssContextService } from '../../jss-context.service';
import { Field, ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-brand-question-component',
  templateUrl: './brand-question-component.component.html',
  styleUrls: ['./brand-question-component.component.scss']
})
export class BrandQuestionComponentComponent implements OnInit {
  @Input() rendering: ComponentRendering;

  selectedQueryIndex = null;
  contextFields: { [name: string]: Field };
  private contextSubscription: Subscription;
  quesCollection: any;
  quesFeatured: any;
  queryState: any = []
  featuredState: any = [];
  key = {
    featured:'featured',
    query:'query'
  }
  constructor(
    private jssContext: JssContextService,
    private http: HttpClient,
    ) { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('brand-question-component component initialized with component data', this.rendering);

    //load featured questions
    this.contextSubscription = this.jssContext.state.subscribe((state) => {
      this.contextFields = state.sitecore.route.fields;
      console.log('context', this.contextFields)
      this.quesFeatured = this.contextFields.questionList
      var brand = this.contextFields.name.value;

      //Create "Open" State for Featured Questions
      this.quesFeatured.forEach( element => {
        var a = {open:false}
        this.featuredState.push(a)
      })
      this.loadQueriedQuestions(brand)
    });
    console.log('Context Subscription : ', this.contextSubscription);
  }

  toggleQuestion(key, index) {
    if(key == this.key.featured){
      this.featuredState[index].open =! this.featuredState[index].open
    }
    else if (key == this.key.query){
      this.queryState[index].open =! this.queryState[index].open
    }
  }

  loadQueriedQuestions(brand){
    // var search = `${brand}`;
    console.log('argument', brand)
    var query = `{search(fieldsEqual: [{name: "_fullpath", value:"/sitecore/content/Sandbox/phrjss/Components/Questions/*"}],
    keyword: "") {
    results {
      items {
        item {
          id
          name
          path
          url
          ... on Question {
            questionid {
              value
            }
            questionstatement {
              value
            }
            answer {
              value
            }
            askeddate {
              value
            }
            brand {
              value
              name
              displayName
            }
          }
        }
      }
    }
  }
}`

    var url = `${environment.graphQLEndpoint}&query=${query}`

    this.http.get(url).subscribe((res: any) => {

      this.quesCollection = res.data.search.results.items;
      console.log('GraphQL question', this.quesCollection);

      //Create "Open" state for query questions, set to default
      this.quesCollection.forEach( element => {
        var a = {open:false}
        this.queryState.push(a)
      })

      //Remove Duplicates from Featured Questions List
      //create array of questionstatements (unique identifier)
      var b = []
      this.quesFeatured.forEach( element => {
        b.push(element.fields.questionstatement.value)
      })
      //Loop through new array. If there are matches on questionstatement, remove from quesCollection
      b.forEach( questionStatement => {
        this.quesCollection.forEach( (element, index) => {
          if(questionStatement == element.item.questionstatement.value){
            this.quesCollection.splice(index, 1)
          }
        })
      })
    }
    )
  }
}

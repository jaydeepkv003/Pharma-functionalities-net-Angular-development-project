import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-table-sort',
  templateUrl: './table-sort.component.html',
  styleUrls: ['./table-sort.component.css']
})
export class TableSortComponent implements OnChanges, OnInit {
  @Input() rendering: ComponentRendering;
  @Input() sortArray: any;
  @Input() field: any;
  @Input() isreload: boolean;
  isAsc: boolean = false;
  icon = 'unfold_more';
  constructor() { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('table-sort component initialized with component data', this.rendering);

  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'isreload': {
            if (this.isreload) {
              this.icon = 'unfold_more';
              this.isAsc = false;
            }
          }
        }
      }
    }
  }

 sortData() {
    this.isAsc = !this.isAsc;
    let valueA = '';
    let valueB = '';
    this.sortArray.sort((a, b) => {
      this.icon = 'keyboard_arrow_up';
      if (this.isAsc)
        this.icon = 'keyboard_arrow_down';
      var stackA = this.field.split('.');
      var stackB = this.field.split('.');
      while (stackA.length > 0) {
        a = a[stackA.shift()];
        b = b[stackB.shift()];
      }
      valueA = a;
      valueB = b;
      if (this.isAsc) {
        return (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0;
      }
      else {
        return (valueA < valueB) ? 1 : (valueA > valueB) ? -1 : 0;
      }
    });
  }

}

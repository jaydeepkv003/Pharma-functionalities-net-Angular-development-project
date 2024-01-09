import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-tabs-documents-tab',
  templateUrl: './tabs-documents-tab.component.html',
  styleUrls: ['./tabs-documents-tab.component.scss']
})
export class TabsDocumentsTabComponent implements OnInit {
  @Input() rendering: ComponentRendering;

  constructor() { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('tabs-documents-tab component initialized with component data', this.rendering);
  }
}

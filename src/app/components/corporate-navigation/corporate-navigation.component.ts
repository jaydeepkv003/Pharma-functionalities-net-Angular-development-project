import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-corporate-navigation',
  templateUrl: './corporate-navigation.component.html',
  styleUrls: ['./corporate-navigation.component.scss']
})
export class CorporateNavigationComponent implements OnInit {
  @Input() rendering: ComponentRendering;

  constructor() { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('corporate-navigation component initialized with component data', this.rendering);
  }
    // mg code
  //menu open
  phrHamMenuExpandFunction(){
    $('.phen-big-nav').fadeIn('fast');
    $('body').css('overflow', 'hidden');

  }


  //menu close
  phrHamMenuCloseFunction() {
   $('.phen-big-nav').fadeOut('fast');
    $('body').css('overflow', 'auto');
  }
}

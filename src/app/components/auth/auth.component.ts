import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  userLoggedIn: boolean = false;
  userName: any;
  constructor(private oauthService: OAuthService) { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('auth component initialized with component data', this.rendering);
    this.getName();
  }

  login() {
    console.log("hello world")
    this.oauthService.initImplicitFlow();
  }

  public logoff() {
    //need to handle this logout case in app.component.ts
    this.oauthService.logOut();
  }

  public getName() {
    let claims: any = this.oauthService.getIdentityClaims();
    if (claims) {
      console.log('claims', claims)
      this.userName = claims.name;
    }
  }
}

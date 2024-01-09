import { Component } from '@angular/core';
import { SharedService } from '../../_services/shared.service';
import { CqaService } from '../../_services/cqa.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../_core/auth.service';
@Component({
  selector: 'app-dashboard-cqa-hplc-tab',
  templateUrl: './dashboard-cqa-hplc-tab.component.html',
  styleUrls: ['./dashboard-cqa-hplc-tab.component.scss']
})
export class DashboardCqaHplcTabComponent {
  messageSubscription$: Subscription;

  constructor(public cqaService: CqaService,
    public authService: AuthService,
    public sharedService: SharedService) {}

  ngOnInit() {
  }
}

import { Component } from '@angular/core';
import { AppSrcAssetsConstant } from '../../../common/app-src-assets.constant';

@Component({
  selector: 'app-app-card-dashboard',
  templateUrl: './app-card-dashboard.component.html',
  styleUrls: ['./app-card-dashboard.component.scss']
})
export class AppCardDashboardComponent {
  readonly AppSrcAssetsConstant = AppSrcAssetsConstant;

  constructor() {
  }
}

import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouteConstant } from '../../../common/app-route.constant';
import { AppSrcAssetsConstant } from '../../../common/app-src-assets.constant';
import { ApplicationModel } from '../../../models/application.model';

@Component({
  selector: 'app-application-card-dashboard',
  templateUrl: './application-card-dashboard.component.html',
  styleUrls: ['./application-card-dashboard.component.scss']
})
export class ApplicationCardDashboardComponent {
  readonly AppSrcAssetsConstant = AppSrcAssetsConstant;
  readonly AppRouteConstant = AppRouteConstant;

  @Input() item: ApplicationModel;

  constructor(public router: Router,
              public route: ActivatedRoute) {
  }

  onActionButtonClick(option: string) {
    this.router.navigate([this.item.address], {relativeTo: this.route, queryParams: {tab: option}}).then();
  }


}
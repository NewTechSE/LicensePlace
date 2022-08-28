import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { AppRouteConstant } from '../../../common/app-route.constant';
import { AppSrcAssetsConstant } from '../../../common/app-src-assets.constant';
import { ApplicationModel } from '../../../models/application.model';
import { IpfsUtil } from '../../../utils/ipfs.util';

@Component({
  selector: 'app-application-card-dashboard',
  templateUrl: './application-card-dashboard.component.html',
  styleUrls: ['./application-card-dashboard.component.scss']
})
export class ApplicationCardDashboardComponent {
  readonly AppSrcAssetsConstant = AppSrcAssetsConstant;
  readonly AppRouteConstant = AppRouteConstant;
  readonly IpfsUtil = IpfsUtil;
  readonly moment = moment;

  @Input() item: ApplicationModel;

  constructor(public router: Router,
              public route: ActivatedRoute) {
  }

  onActionButtonClick(option: string) {
    this.router.navigate([this.item.address], {relativeTo: this.route, queryParams: {tab: option}}).then();
  }


}

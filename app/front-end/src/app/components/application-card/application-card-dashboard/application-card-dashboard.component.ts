import { Component, Input } from '@angular/core';
import { AppSrcAssetsConstant } from '../../../common/app-src-assets.constant';
import { ApplicationModel } from '../../../models/application.model';

@Component({
  selector: 'app-application-card-dashboard',
  templateUrl: './application-card-dashboard.component.html',
  styleUrls: ['./application-card-dashboard.component.scss']
})
export class ApplicationCardDashboardComponent {
  readonly AppSrcAssetsConstant = AppSrcAssetsConstant;

  @Input() item: ApplicationModel;
}

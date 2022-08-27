import { Component, Input } from '@angular/core';
import { AppSrcAssetsConstant } from '../../../common/app-src-assets.constant';
import { ApplicationModel } from '../../../models/application.model';
import { LicenseService } from '../../../services/license.service';

@Component({
  selector: 'app-application-card-own',
  templateUrl: './application-card-own.component.html',
  styleUrls: ['./application-card-own.component.scss']
})
export class ApplicationCardOwnComponent {
  readonly AppSrcAssetsConstant = AppSrcAssetsConstant;

  @Input() item: ApplicationModel;

  constructor(public licenseService: LicenseService) {
  }

  getMyTotalLicense(): number {
    return this.licenseService.getMyTotalLicenseTickets(this.item.address);
  }

  getMyRemainLicense(): number {
    return this.licenseService.getMyRemainLicenseTicketsInMarket(this.item.address);
  }
}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppRouteConstant } from '../../../common/app-route.constant';
import { AppSrcAssetsConstant } from '../../../common/app-src-assets.constant';
import { ApplicationModel } from '../../../models/application.model';
import { LicenseService } from '../../../services/license.service';
import { IpfsUtil } from '../../../utils/ipfs.util';
import { ApplicationDialogComponent } from '../../application-dialog/application-dialog.component';

@Component({
  selector: 'app-application-card-own',
  templateUrl: './application-card-own.component.html',
  styleUrls: ['./application-card-own.component.scss'],
  providers: [DialogService]
})
export class ApplicationCardOwnComponent {
  readonly AppSrcAssetsConstant = AppSrcAssetsConstant;
  readonly IpfsUtil = IpfsUtil;
  readonly moment = moment;

  @Input() item: ApplicationModel;

  applicationDialogRef: DynamicDialogRef;

  constructor(public licenseService: LicenseService,
              public dialogService: DialogService,
              public router: Router) {
  }

  getMyTotalLicense(): number {
    return 1000;
  }

  getMyRemainLicense(): number {
    return 100;
  }

  onViewDetailButtonClicked(): void {
    this.applicationDialogRef = this.dialogService.open(ApplicationDialogComponent, {
      header: 'Application Information',
      data: {
        application: this.item
      },
      width: '50vw',
      baseZIndex: 1000000,
    })
  }

  onViewLicenseButtonClicked(): void {
    this.router.navigate([AppRouteConstant.YOUR_LICENSE]).then();
  }
}

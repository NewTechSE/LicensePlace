import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppSrcAssetsConstant } from '../../../common/app-src-assets.constant';
import { ApplicationModel } from '../../../models/application.model';
import { LicenseModel } from '../../../models/license.model';
import { LicenseplaceService } from '../../../services/licenseplace.service';
import { IpfsUtil } from '../../../utils/ipfs.util';
import { LicenseDialogComponent } from '../../license-dialog/license-dialog.component';

@Component({
  selector: 'app-license-card-own',
  templateUrl: './license-card-own.component.html',
  styleUrls: ['./license-card-own.component.scss']
})
export class LicenseCardOwnComponent implements OnInit {
  readonly AppSrcAssetsConstant = AppSrcAssetsConstant;
  readonly IpfsUtil = IpfsUtil;

  @Input() item: LicenseModel;

  application: ApplicationModel;

  licenseDialogRef: DynamicDialogRef;

  constructor(public licenseplaceService: LicenseplaceService,
              public dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.getApplication();
  }

  getApplication() {
    this.application = Object.values(this.licenseplaceService.licenseplace.value.applications).find(app => app.licenses[this.item.address]);
  }

  onViewDetailButtonClicked(): void {
    this.licenseDialogRef = this.dialogService.open(LicenseDialogComponent, {
      header: 'License Information',
      data: {
        license: this.item
      },
      width: '50vw',
      baseZIndex: 1000000,
    })
  }

  onWithdrawButtonClicked(): void {

  }
}

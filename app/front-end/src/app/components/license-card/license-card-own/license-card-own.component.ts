import { Component, Input, OnInit } from '@angular/core';
import { AppSrcAssetsConstant } from '../../../common/app-src-assets.constant';
import { ApplicationModel } from '../../../models/application.model';
import { LicenseModel } from '../../../models/license.model';
import { LicenseplaceService } from '../../../services/licenseplace.service';

@Component({
  selector: 'app-license-card-own',
  templateUrl: './license-card-own.component.html',
  styleUrls: ['./license-card-own.component.scss']
})
export class LicenseCardOwnComponent implements OnInit {
  readonly AppSrcAssetsConstant = AppSrcAssetsConstant;

  @Input() item: LicenseModel;

  application: ApplicationModel;

  constructor(public licenseplaceService: LicenseplaceService) {
  }

  ngOnInit(): void {
    this.getApplication();
  }

  getApplication() {
    this.application = Object.values(this.licenseplaceService.licenseplace.value.applications).find(app => app.licenses[this.item.address]);
  }

  onViewDetailButtonClicked(): void {
    alert('View and update license information');
  }
}

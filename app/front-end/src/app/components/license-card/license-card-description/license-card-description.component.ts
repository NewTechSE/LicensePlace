import { Component, Input, OnInit } from '@angular/core';
import { AppSrcAssetsConstant } from '../../../common/app-src-assets.constant';
import { LicenseModel } from '../../../models/license.model';
import { LicenseService } from '../../../services/license.service';
import { IpfsUtil } from '../../../utils/ipfs.util';

@Component({
  selector: 'app-license-card-description',
  templateUrl: './license-card-description.component.html',
  styleUrls: ['./license-card-description.component.scss']
})
export class LicenseCardDescriptionComponent implements OnInit {
  readonly AppSrcAssetsConstant = AppSrcAssetsConstant;
  readonly IpfsUtil = IpfsUtil;

  @Input() item: LicenseModel;

  constructor(public licenseService: LicenseService) {
  }

  ngOnInit() {
  }

  public buyFromPublisher() {
    this.licenseService.buyFromPublisher(this.item).then();
  }
}

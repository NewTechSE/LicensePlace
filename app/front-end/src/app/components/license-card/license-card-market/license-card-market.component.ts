import { Component, Input, OnInit } from '@angular/core';
import { AppSrcAssetsConstant } from '../../../common/app-src-assets.constant';
import { LicenseModel } from '../../../models/license.model';

@Component({
  selector: 'app-license-card-market',
  templateUrl: './license-card-market.component.html',
  styleUrls: ['./license-card-market.component.scss']
})
export class LicenseCardMarketComponent implements OnInit {
  readonly AppSrcAssetsConstant = AppSrcAssetsConstant;

  @Input() item: LicenseModel;

  constructor() {
  }

  ngOnInit(): void {
  }

  onBuyButtonClicked(): void {
    alert('Buy license');
  }
}

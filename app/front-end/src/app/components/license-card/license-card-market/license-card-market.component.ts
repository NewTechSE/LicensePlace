import { Component, Input, OnInit } from '@angular/core';
import { AppSrcAssetsConstant } from '../../../common/app-src-assets.constant';
import { ApplicationModel } from '../../../models/application.model';
import { LicenseModel, TokenModel, TokenStateEnum } from '../../../models/license.model';
import { LicenseService } from '../../../services/license.service';
import { LicenseplaceService } from '../../../services/licenseplace.service';
import { SubscriptionAwareAbstractComponent } from '../../subscription-aware.abstract.component';

@Component({
  selector: 'app-license-card-market',
  templateUrl: './license-card-market.component.html',
  styleUrls: ['./license-card-market.component.scss']
})
export class LicenseCardMarketComponent extends SubscriptionAwareAbstractComponent implements OnInit {
  readonly AppSrcAssetsConstant = AppSrcAssetsConstant;
  readonly TokenStateEnum = TokenStateEnum;

  @Input() item: TokenModel;

  application: ApplicationModel;
  license: LicenseModel;

  price: number = 0;

  constructor(public licenseplaceService: LicenseplaceService,
              public licenseService: LicenseService) {
    super();
  }

  ngOnInit(): void {
    this.registerSubscription(
      this.licenseplaceService.licenseplace.subscribe(licenseplace => {
        if (licenseplace && licenseplace.applications) {
          Object.values(licenseplace.applications).find(application => {
            Object.values(application.licenses).find(license => {
              if (license.tokens && license.tokens.find(token => token.tokenId === this.item.tokenId)) {
                this.application = application;
                this.license = license;
                this.price = this.item.price;
              }
            })
          })
        }
      })
    );
  }

  onBuyButtonClicked() {

  }
}

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppRouteConstant } from '../../common/app-route.constant';
import { LicenseModel } from '../../models/license.model';
import { AccountService } from '../../services/account.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { LicenseplaceService } from '../../services/licenseplace.service';
import { LicenseDialogComponent } from '../license-dialog/license-dialog.component';
import { SubscriptionAwareAbstractComponent } from '../subscription-aware.abstract.component';

@Component({
  selector: 'app-your-license-page',
  templateUrl: './your-license-page.component.html',
  styleUrls: ['./your-license-page.component.scss'],
  providers: [DialogService]
})
export class YourLicensePageComponent extends SubscriptionAwareAbstractComponent implements OnInit {
  static breadcrumb: MenuItem = {
    label: 'Your License Management',
    routerLink: [AppRouteConstant.YOUR_LICENSE]
  };

  licenseTicketsInMarket: LicenseModel[] = [];
  licenseTicketsInUsage: LicenseModel[] = [];
  licenseTicketsInOutdated: LicenseModel[] = [];

  licenseDialog: DynamicDialogRef;

  constructor(public breadcrumbService: BreadcrumbService,
              public licenseplaceService: LicenseplaceService,
              public accountService: AccountService,
              public dialogService: DialogService) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.breadcrumbService.initBreadcrumb([YourLicensePageComponent.breadcrumb]);
    }, 0);

    const licenses = [];
    // Object.values(this.licenseplaceService.licenseplace.value.applications).forEach(app => {
    //   Object.values(app.licenses).forEach(license => {
    //     license.publisher === this.accountService.account.value.address && licenses.push(license);
    //   });
    // });
  }

  onCreateLicenseButtonClicked() {
    this.licenseDialog = this.dialogService.open(LicenseDialogComponent, {
      header: 'Create Your License',
      width: '50vw',
      baseZIndex: 10000,
    });
  }
}

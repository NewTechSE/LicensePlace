import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppRouteConstant } from '../../common/app-route.constant';
import { ApplicationModel } from '../../models/application.model';
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

  applications: ApplicationModel[];

  licenses: LicenseModel[] = [];

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

    this.registerSubscription(
      this.licenseplaceService.licenseplace.subscribe(licenseplace => {
        if (licenseplace && licenseplace.applications) {
          this.applications = Object.values(licenseplace.applications).filter(app => (
            app.publisher.toLowerCase() === this.accountService.account.value.address.toLowerCase()
          ));

          this.licenses = [];
          this.applications.forEach(app => {
            this.licenses.push(...Object.values(app.licenses));
          });
        } else {
          this.applications = [];
          this.licenses = [];
        }
      })
    )
  }

  onCreateLicenseButtonClicked() {
    this.licenseDialog = this.dialogService.open(LicenseDialogComponent, {
      header: 'Create Your License',
      width: '50vw',
      baseZIndex: 10000,
    });
  }
}

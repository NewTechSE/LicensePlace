import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppRouteConstant } from '../../common/app-route.constant';
import { LicenseModel } from '../../models/license.model';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { LicenseService } from '../../services/license.service';
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
              public licenseService: LicenseService,
              public dialogService: DialogService) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.breadcrumbService.initBreadcrumb([YourLicensePageComponent.breadcrumb]);
    }, 0);

    this.licenseService.getMyLicenseTicketsInMarket().subscribe(licenseTickets => {
      this.licenseTicketsInMarket = licenseTickets;
    });

    this.licenseService.getMyLicenseTicketsInUsage().subscribe(licenseTickets => {
      this.licenseTicketsInUsage = licenseTickets;
    });

    this.licenseService.getMyLicenseTicketsInOutdated().subscribe(licenseTickets => {
      this.licenseTicketsInOutdated = licenseTickets;
    });
  }

  onCreateLicenseButtonClicked() {
    this.licenseDialog = this.dialogService.open(LicenseDialogComponent, {
      header: 'Create Your License',
      width: '50vw',
      baseZIndex: 10000,
    });
  }
}

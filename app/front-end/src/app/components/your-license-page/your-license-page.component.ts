import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppRouteConstant } from '../../common/app-route.constant';
import { LicenseModel } from '../../models/license.model';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { LicenseService } from '../../services/license.service';
import { SubscriptionAwareAbstractComponent } from '../subscription-aware.abstract.component';

@Component({
  selector: 'app-your-license-page',
  templateUrl: './your-license-page.component.html',
  styleUrls: ['./your-license-page.component.scss']
})
export class YourLicensePageComponent extends SubscriptionAwareAbstractComponent implements OnInit {
  static breadcrumb: MenuItem = {
    label: 'Your License Management',
    routerLink: [AppRouteConstant.YOUR_LICENSE]
  };

  licenseTicketsInMarket: LicenseModel[] = [];
  licenseTicketsInUsage: LicenseModel[] = [];
  licenseTicketsInOutdated: LicenseModel[] = [];

  constructor(public breadcrumbService: BreadcrumbService,
              public licenseService: LicenseService) {
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

}

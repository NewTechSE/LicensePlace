import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppRouteConstant } from '../../common/app-route.constant';
import { ApplicationModel } from '../../models/application.model';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { LicenseplaceService } from '../../services/licenseplace.service';
import { SnackbarService } from '../../services/snackbar.service';
import { SubscriptionAwareAbstractComponent } from '../subscription-aware.abstract.component';

@Component({
  selector: 'app-licenseplace-dashboard-page',
  templateUrl: './licenseplace-dashboard-page.component.html',
  styleUrls: ['./licenseplace-dashboard-page.component.scss']
})
export class LicenseplaceDashboardPageComponent extends SubscriptionAwareAbstractComponent implements OnInit {
  static breadcrumb: MenuItem = {
    label: 'Licenseplace Dashboard',
    routerLink: [AppRouteConstant.LICENSEPLACE_DASHBOARD]
  };

  applications: ApplicationModel[] = [];

  searchKeyword: string = '';
  applicationsFiltered: ApplicationModel[] = [];

  constructor(public breadcrumbService: BreadcrumbService,
              public licenseplaceService: LicenseplaceService,
              public snackbarService: SnackbarService) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.breadcrumbService.initBreadcrumb([LicenseplaceDashboardPageComponent.breadcrumb]);
    }, 0);

    this.registerSubscription(
      this.licenseplaceService.licenseplace.subscribe(licenseplace => {
        if (licenseplace && licenseplace.applications) {
          this.applications = Object.values(licenseplace.applications);
          this.search(this.searchKeyword);
        } else {
          this.applications = [];
        }
      })
    );
  }

  search(keyword: string) {
    this.searchKeyword = keyword;
    this.applicationsFiltered = this.applications.filter(app => {
      return app.name.toLowerCase().includes(keyword.toLowerCase())
        || app.symbol.toLowerCase().includes(keyword.toLowerCase())
        || app.description.toLowerCase().includes(keyword.toLowerCase())
        || app.publisher.toLowerCase().includes(keyword.toLowerCase())
        || app.publisherName.toLowerCase().includes(keyword.toLowerCase())
        || app.version.toLowerCase().includes(keyword.toLowerCase())
        || app.address.toLowerCase().includes(keyword.toLowerCase())
    });
  }

}

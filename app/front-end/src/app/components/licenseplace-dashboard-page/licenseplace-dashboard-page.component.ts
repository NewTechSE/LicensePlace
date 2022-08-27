import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppRouteConstant } from '../../common/app-route.constant';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { SubscriptionAwareAbstractComponent } from '../subscription-aware.abstract.component';

@Component({
  selector: 'app-licenseplace-dashboard-page',
  templateUrl: './licenseplace-dashboard-page.component.html',
  styleUrls: ['./licenseplace-dashboard-page.component.scss']
})
export class LicenseplaceDashboardPageComponent extends SubscriptionAwareAbstractComponent implements OnInit {
  breadcrumb: MenuItem = {
    label: 'Licenseplace Dashboard',
    routerLink: [AppRouteConstant.LICENSEPLACE_DASHBOARD]
  };

  constructor(public breadcrumbService: BreadcrumbService) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.breadcrumbService.initBreadcrumb([this.breadcrumb]);
    }, 0);
  }

}

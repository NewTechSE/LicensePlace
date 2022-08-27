import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppRouteConstant } from '../../common/app-route.constant';
import { ApplicationModel } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';
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
  keywordFilter: string = '';
  applicationsFiltered: ApplicationModel[] = [];

  constructor(public breadcrumbService: BreadcrumbService,
              public applicationService: ApplicationService,
              public snackbarService: SnackbarService) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.breadcrumbService.initBreadcrumb([LicenseplaceDashboardPageComponent.breadcrumb]);
    }, 0);

    this.applicationService.getApplications().subscribe({
      next: (applications: ApplicationModel[]) => {
        this.applications = applications;
        this.search(this.keywordFilter);
      },
      error: (error: any) => {
        this.snackbarService.openRequestErrorAnnouncement(error);
      }
    });
  }

  search(keyword: string) {
    this.keywordFilter = keyword;
    this.applicationsFiltered = this.applications.filter(application => {
      return application.name?.toLowerCase().includes(keyword.toLowerCase())
        || application.description?.toLowerCase().includes(keyword.toLowerCase())
        || application.address?.toLowerCase().includes(keyword.toLowerCase());
    });
  }

}

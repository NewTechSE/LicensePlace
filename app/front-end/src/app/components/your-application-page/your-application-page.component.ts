import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppRouteConstant } from '../../common/app-route.constant';
import { ApplicationModel } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { SnackbarService } from '../../services/snackbar.service';
import { SubscriptionAwareAbstractComponent } from '../subscription-aware.abstract.component';

@Component({
  selector: 'app-your-application-page',
  templateUrl: './your-application-page.component.html',
  styleUrls: ['./your-application-page.component.scss']
})
export class YourApplicationPageComponent extends SubscriptionAwareAbstractComponent implements OnInit {
  static breadcrumb: MenuItem = {
    label: 'Your Application Management',
    routerLink: [AppRouteConstant.YOUR_APPLICATION]
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
      this.breadcrumbService.initBreadcrumb([YourApplicationPageComponent.breadcrumb]);
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

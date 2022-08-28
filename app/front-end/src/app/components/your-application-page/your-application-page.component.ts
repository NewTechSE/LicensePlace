import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppRouteConstant } from '../../common/app-route.constant';
import { ApplicationModel } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ApplicationDialogComponent } from '../application-dialog/application-dialog.component';
import { SubscriptionAwareAbstractComponent } from '../subscription-aware.abstract.component';

@Component({
  selector: 'app-your-application-page',
  templateUrl: './your-application-page.component.html',
  styleUrls: ['./your-application-page.component.scss'],
  providers: [DialogService]
})
export class YourApplicationPageComponent extends SubscriptionAwareAbstractComponent implements OnInit {
  static breadcrumb: MenuItem = {
    label: 'Your Application Management',
    routerLink: [AppRouteConstant.YOUR_APPLICATION]
  };

  applications: ApplicationModel[] = [];
  keywordFilter: string = '';
  applicationsFiltered: ApplicationModel[] = [];

  applicationDialog: DynamicDialogRef;

  constructor(public breadcrumbService: BreadcrumbService,
              public applicationService: ApplicationService,
              public snackbarService: SnackbarService,
              public dialogService: DialogService) {
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

  onCreateApplicationButtonClicked() {
    this.applicationDialog = this.dialogService.open(ApplicationDialogComponent, {
      header: 'Create Your Own Application',
      width: '50vw',
      baseZIndex: 10000,
    });
  }
}

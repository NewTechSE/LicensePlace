import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppRouteConstant } from '../../common/app-route.constant';
import { ApplicationModel } from '../../models/application.model';
import { AccountService } from '../../services/account.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { LicenseplaceService } from '../../services/licenseplace.service';
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

  searchKeyword: string = '';
  applicationsFiltered: ApplicationModel[] = [];

  applicationDialog: DynamicDialogRef;

  constructor(public breadcrumbService: BreadcrumbService,
              public licenseplaceService: LicenseplaceService,
              public accountService: AccountService,
              public snackbarService: SnackbarService,
              public dialogService: DialogService) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.breadcrumbService.initBreadcrumb([YourApplicationPageComponent.breadcrumb]);
    }, 0);

    this.registerSubscription(
      this.licenseplaceService.licenseplace.subscribe(licenseplace => {
        if (licenseplace && licenseplace.applications) {
          this.applications = Object.values(licenseplace.applications).filter(app => (
            app.publisher.toLowerCase() === this.accountService.account.value.address.toLowerCase()
          ));
          this.search(this.searchKeyword);
        } else {
          this.applications = [];
        }
      })
    )

    this.search(this.searchKeyword);
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

  onCreateApplicationButtonClicked() {
    this.applicationDialog = this.dialogService.open(ApplicationDialogComponent, {
      header: 'Create Your Own Application',
      width: '50vw',
      baseZIndex: 100,
    });
  }
}

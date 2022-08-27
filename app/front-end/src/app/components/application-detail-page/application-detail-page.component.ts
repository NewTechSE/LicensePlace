import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabView } from 'primeng/tabview';
import { AppRouteConstant } from '../../common/app-route.constant';
import { AppSrcAssetsConstant } from '../../common/app-src-assets.constant';
import { SizeEnum } from '../../enums/size.enum';
import { ApplicationModel } from '../../models/application.model';
import { LicenseTypeModel } from '../../models/license-type.model';
import { LicenseModel } from '../../models/license.model';
import { ApplicationService } from '../../services/application.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { LicenseService } from '../../services/license.service';
import {
  LicenseplaceDashboardPageComponent
} from '../licenseplace-dashboard-page/licenseplace-dashboard-page.component';
import { SubscriptionAwareAbstractComponent } from '../subscription-aware.abstract.component';

@Component({
  selector: 'app-application-detail-page',
  templateUrl: './application-detail-page.component.html',
  styleUrls: ['./application-detail-page.component.scss']
})
export class ApplicationDetailPageComponent extends SubscriptionAwareAbstractComponent implements OnInit, AfterViewInit {
  readonly AppSrcAssetsConstant = AppSrcAssetsConstant;
  readonly SizeEnum = SizeEnum;

  selectedTabIndex: number = 0;
  address: string = '';
  application: ApplicationModel = null;
  licenseTypes: LicenseTypeModel[] = [];
  licensesInMarket: LicenseModel[] = [];
  licenseInMarketFiltered: LicenseModel[] = [];
  licenseInMarketKeyword: string = '';

  breadcrumb: MenuItem = {
    label: this.application?.name ?? 'Application Detail Dashboard',
    routerLink: [AppRouteConstant.LICENSEPLACE_DASHBOARD, this.address ?? '#']
  }

  tabOptions = ['overview', 'license-market']

  @ViewChild('tabView') tabView!: TabView;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private breadcrumbService: BreadcrumbService,
              private applicationService: ApplicationService,
              private licenseService: LicenseService,
              private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.registerSubscription(
      this.route.params.subscribe(params => {
          this.address = params['address'];

          this.applicationService.getApplication(this.address).subscribe(application => {
            this.application = application;
            this.licenseTypes = application?.licenseTypes ?? [];

            this.breadcrumb.label = this.application?.name ?? 'Application Detail Dashboard';
            this.breadcrumb.routerLink = [AppRouteConstant.LICENSEPLACE_DASHBOARD, this.address ?? '#'];

            setTimeout(() => {
              this.breadcrumbService.initBreadcrumb([LicenseplaceDashboardPageComponent.breadcrumb, this.breadcrumb]);
            }, 0);
          });

          this.licenseService.getLicensesInMarketOfApplication(this.address).subscribe(licenses => {
            this.licensesInMarket = licenses;
            this.search(this.licenseInMarketKeyword);
          });

          this.licenseService.getLicensesInMarketOfApplication(this.address).subscribe(licenses => {
            this.licensesInMarket = licenses ?? [];
          });
        }
      ));
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedTabIndex = this.getTabIndex(params['tab']);

      this.cdr.detectChanges();
    });
  }

  getTabIndex(tabName: string): number {
    if (!tabName) return 0;

    let selectedIndex = this.tabOptions.findIndex(
      x => x.toLowerCase() === tabName.toLowerCase()
    );

    if (selectedIndex > -1) return selectedIndex;

    return 0;
  }

  onTabChanged(event: any) {
    this.selectedTabIndex = event.index;
  }

  search(keyword: string) {
    this.licenseInMarketKeyword = keyword;
    this.licenseInMarketFiltered = this.licensesInMarket.filter(license => {
      return license.address?.toLowerCase().includes(keyword.toLowerCase())
        || license.ownerAddress?.toLowerCase().includes(keyword.toLowerCase())
        || license.price?.toString().toLowerCase().includes(keyword.toLowerCase());
    });
  }

}

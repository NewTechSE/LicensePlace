import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabView } from 'primeng/tabview';
import { AppRouteConstant } from '../../common/app-route.constant';
import { AppSrcAssetsConstant } from '../../common/app-src-assets.constant';
import { SizeEnum } from '../../enums/size.enum';
import { ApplicationModel } from '../../models/application.model';
import { LicenseModel, TokenModel, TokenStateEnum } from '../../models/license.model';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { LicenseplaceService } from '../../services/licenseplace.service';
import { SubscriptionAwareAbstractComponent } from '../subscription-aware.abstract.component';

@Component({
  selector: 'app-application-detail-page',
  templateUrl: './application-detail-page.component.html',
  styleUrls: ['./application-detail-page.component.scss']
})
export class ApplicationDetailPageComponent extends SubscriptionAwareAbstractComponent implements OnInit, AfterViewInit {
  readonly AppSrcAssetsConstant = AppSrcAssetsConstant;
  readonly SizeEnum = SizeEnum;
  readonly Object = Object;

  selectedTabIndex: number = 0;
  address: string = '';
  application: ApplicationModel = null;

  tokens: TokenModel[] = [];
  tokenFiltered: TokenModel[] = [];

  licenseSearchKeyword: string = '';
  licenseFiltered: LicenseModel[] = [];

  breadcrumb: MenuItem = {
    label: this.application?.name ?? 'Application Detail Dashboard',
    routerLink: [AppRouteConstant.LICENSEPLACE_DASHBOARD, this.address ?? '#']
  }

  tabOptions = ['overview', 'license-market']

  @ViewChild('tabView') tabView!: TabView;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private breadcrumbService: BreadcrumbService,
              private licenseplaceService: LicenseplaceService,
              private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.registerSubscription(
      this.route.params.subscribe(params => {
          this.address = params['address'];

          this.registerSubscription(
            this.licenseplaceService.licenseplace.subscribe(licenseplace => {
              if (licenseplace && licenseplace.applications) {
                this.application = licenseplace.applications[this.address];

                this.tokens = [];
                Object.values(this.application.licenses).forEach(license => {
                  license.tokens.forEach(token => {
                    if (token.state === TokenStateEnum.SALE) {
                      this.tokens.push(token);
                    }
                  })
                });

                this.search(this.licenseSearchKeyword);
              } else {
                this.application = null;
              }
            })
          );
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
    this.licenseSearchKeyword = keyword;

    this.tokenFiltered = Object.values(this.tokens).filter(token => (
      token.tokenId === parseInt(keyword)
      || token.owner.toLowerCase().includes(keyword.toLowerCase())
      || token.price.toString().includes(keyword)
      // || license.publisher.toLowerCase().includes(keyword.toLowerCase())
    ));
  }

  buyPublisherLicense() {
    this.router.navigate([AppRouteConstant.LICENSEPLACE_DASHBOARD, this.address], {queryParams: {tab: 'overview'}}).then();
  }

}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { PrimengModule } from '../primeng.module';
import {
  ApplicationCardDashboardComponent
} from './application-card/application-card-dashboard/application-card-dashboard.component';
import { ApplicationCardOwnComponent } from './application-card/application-card-own/application-card-own.component';
import { ApplicationDetailPageComponent } from './application-detail-page/application-detail-page.component';
import { ApplicationDialogComponent } from './application-dialog/application-dialog.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import {
  LicenseCardDescriptionComponent
} from './license-card/license-card-description/license-card-description.component';
import { LicenseCardMarketComponent } from './license-card/license-card-market/license-card-market.component';
import { LicenseCardOwnComponent } from './license-card/license-card-own/license-card-own.component';
import { LicenseDialogComponent } from './license-dialog/license-dialog.component';
import {
  LicenseplaceDashboardPageComponent
} from './licenseplace-dashboard-page/licenseplace-dashboard-page.component';
import { ProcessBarComponent } from './loading/process-bar/process-bar.component';
import { ProcessSpinnerComponent } from './loading/process-spinner/process-spinner.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SubscriptionAwareAbstractComponent } from './subscription-aware.abstract.component';
import { UserAccountPanelComponent } from './user-account-panel/user-account-panel.component';
import { YourApplicationPageComponent } from './your-application-page/your-application-page.component';
import { LicenseTabviewComponent } from './your-license-page/license-tabview/license-tabview.component';
import { YourLicensePageComponent } from './your-license-page/your-license-page.component';

@NgModule({
  declarations: [
    SubscriptionAwareAbstractComponent,
    ErrorPageComponent,
    ProcessSpinnerComponent,
    ProcessBarComponent,
    SnackbarComponent,
    NavbarComponent,
    LicenseplaceDashboardPageComponent,
    ApplicationCardDashboardComponent,
    SearchbarComponent,
    ApplicationCardOwnComponent,
    YourApplicationPageComponent,
    LicenseCardOwnComponent,
    YourLicensePageComponent,
    LicenseTabviewComponent,
    ApplicationDialogComponent,
    LicenseDialogComponent,
    ApplicationDetailPageComponent,
    LicenseCardDescriptionComponent,
    LicenseCardMarketComponent,
    UserAccountPanelComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    PrimengModule,
  ],
  exports: [
    NavbarComponent,
    ErrorPageComponent,
    ProcessBarComponent,
    ProcessSpinnerComponent,
    SnackbarComponent,
    UserAccountPanelComponent
  ],
})
export class ComponentsModule {
}

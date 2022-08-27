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
import { AppDialogComponent } from './application-dialog/app-dialog.component';
import { ErrorPageComponent } from './error-page/error-page.component';
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
    AppDialogComponent,
    LicenseDialogComponent,
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
  ],
})
export class ComponentsModule {
}

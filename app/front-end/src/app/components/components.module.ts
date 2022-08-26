import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { PrimengModule } from '../primeng.module';
import { AppCardDashboardComponent } from './app-card/app-card-dashboard/app-card-dashboard.component';
import { AppCardOwnComponent } from './app-card/app-card-own/app-card-own.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LicenseCardOwnComponent } from './license-card/license-card-own/license-card-own.component';
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
    AppCardDashboardComponent,
    SearchbarComponent,
    AppCardOwnComponent,
    YourApplicationPageComponent,
    LicenseCardOwnComponent,
    YourLicensePageComponent,
    LicenseTabviewComponent,
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

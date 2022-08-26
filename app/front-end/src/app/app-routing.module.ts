import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteConstant } from './common/app-route.constant';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import {
  LicenseplaceDashboardPageComponent
} from './components/licenseplace-dashboard-page/licenseplace-dashboard-page.component';
import { YourApplicationPageComponent } from './components/your-application-page/your-application-page.component';
import { YourLicensePageComponent } from './components/your-license-page/your-license-page.component';
import { PageNotFoundErrorModel } from './models/error.model';

const routes: Routes = [
  {path: AppRouteConstant.HOME, redirectTo: AppRouteConstant.LICENSEPLACE_DASHBOARD, pathMatch: 'full'},
  {path: AppRouteConstant.LICENSEPLACE_DASHBOARD, component: LicenseplaceDashboardPageComponent},
  {path: AppRouteConstant.YOUR_APPLICATION, component: YourApplicationPageComponent},
  {path: AppRouteConstant.YOUR_LICENSE, component: YourLicensePageComponent},
  {path: AppRouteConstant.OTHER, component: ErrorPageComponent, data: PageNotFoundErrorModel.init()}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

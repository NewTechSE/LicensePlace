import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteConstant } from './common/app-route.constant';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PageNotFoundErrorModel } from './models/error.model';

const routes: Routes = [
  {path: AppRouteConstant.HOME, component: HomepageComponent},
  {path: AppRouteConstant.OTHER, component: ErrorPageComponent, data: PageNotFoundErrorModel.init()}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

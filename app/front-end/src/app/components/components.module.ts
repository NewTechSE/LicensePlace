import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { PrimengModule } from '../primeng.module';
import { AppCardComponent } from './app-card/app-card.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProcessBarComponent } from './loading/process-bar/process-bar.component';
import { ProcessSpinnerComponent } from './loading/process-spinner/process-spinner.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SubscriptionAwareAbstractComponent } from './subscription-aware.abstract.component';

@NgModule({
  declarations: [
    SubscriptionAwareAbstractComponent,
    ErrorPageComponent,
    ProcessSpinnerComponent,
    ProcessBarComponent,
    SnackbarComponent,
    NavbarComponent,
    HomepageComponent,
    AppCardComponent,
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

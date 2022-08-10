import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxIntlModule } from '../ngx-intl.module';
import { PrimengModule } from '../primeng.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProcessBarComponent } from './loading/process-bar/process-bar.component';
import { ProcessSpinnerComponent } from './loading/process-spinner/process-spinner.component';
import { SnackbarComponent } from './snackbar/snackbar.component';

@NgModule({
  declarations: [
    ErrorPageComponent,
    ProcessSpinnerComponent,
    ProcessBarComponent,
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    PrimengModule,
    NgxIntlModule,
  ]
})
export class ComponentsModule {
}

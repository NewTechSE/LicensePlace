import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { HttpErrorHandlerInterceptor } from './interceptors/http-error-handler';
import { LoadingInterceptor } from './interceptors/loading';
import { PrimengModule } from './primeng.module';
import { LoadingService } from './services/loading.service';
import { SnackbarService } from './services/snackbar.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ComponentsModule,
    AppRoutingModule,
    PrimengModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      deps: [LoadingService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptor,
      deps: [SnackbarService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

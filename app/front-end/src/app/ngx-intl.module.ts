import { NgModule } from '@angular/core';
import { TimeagoCustomFormatter, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';

import { CustomTimeagoIntlUtil } from './utils/custom-timeago-intl.util';

@NgModule({
  imports: [
    TimeagoModule.forRoot({
      intl: {provide: TimeagoIntl, useClass: CustomTimeagoIntlUtil},
      formatter: {provide: TimeagoFormatter, useClass: TimeagoCustomFormatter}
    })
  ],
  exports: [
    TimeagoModule
  ],
  declarations: [],
  providers: []
})
export class NgxIntlModule {
}

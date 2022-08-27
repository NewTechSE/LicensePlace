import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SizeEnum } from '../../../enums/size.enum';
import { LicenseModel } from '../../../models/license.model';
import { ArrayUtil } from '../../../utils/array.util';
import { SubscriptionAwareAbstractComponent } from '../../subscription-aware.abstract.component';

@Component({
  selector: 'app-license-tabview',
  templateUrl: './license-tabview.component.html',
  styleUrls: ['./license-tabview.component.scss']
})
export class LicenseTabviewComponent extends SubscriptionAwareAbstractComponent implements OnInit, OnChanges {
  readonly SizeEnum = SizeEnum;

  @Input() licenses: LicenseModel[] = [];

  keywordFilter: string = '';
  licensesFiltered: LicenseModel[] = [];

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const licensesPrevious = changes['licenses']?.previousValue;
    const licensesCurrent = changes['licenses']?.currentValue;

    const changedRes = !licensesPrevious
      || !ArrayUtil.equals(licensesPrevious, licensesCurrent, (b1: LicenseModel, b2: LicenseModel) => (
        b1.address.localeCompare(b2.address)
      ));

    if (changedRes) {
      this.licenses = changes['licenses'].currentValue ?? [];
      this.search(this.keywordFilter);
    }
  }

  search(keyword: string) {
    this.keywordFilter = keyword;
    this.licensesFiltered = this.licenses.filter(license => {
      return license.address?.toLowerCase().includes(keyword.toLowerCase())
        || license.applicationAddress?.toLowerCase().includes(keyword.toLowerCase())
        || license.symbol?.toLowerCase().includes(keyword.toLowerCase());
    });
  }

}

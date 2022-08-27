import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LicenseModel } from '../models/license.model';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  getLicensesOfApplication(appAddress: string) {
    const licenseList: LicenseModel[] = [];
    Array.from({length: 3}).forEach((_, i) => {
      const license = new LicenseModel({
        address: '0x' + i.toString(16),
        updatedOn: '2019-01-01',
        expiresOn: '2019-01-01',
        status: 'selling',
        symbol: 'Vip',
        price: i,
        ownerAddress: '0x' + i.toString(16),
        applicationAddress: appAddress,
      });
      licenseList.push(license);
    });
    return new Observable<LicenseModel[]>(observer => {
      observer.next(licenseList);
    });
  }

  getLicensesInMarketOfApplication(appAddress: string) {
    const licenseList: LicenseModel[] = [];
    Array.from({length: 3}).forEach((_, i) => {
      const license = new LicenseModel({
        address: '0x' + i.toString(16),
        updatedOn: '2019-01-01',
        expiresOn: '2019-01-01',
        status: 'selling',
        symbol: 'Vip',
        price: i,
        ownerAddress: '0x' + i.toString(16),
        applicationAddress: appAddress,
      });
      licenseList.push(license);
    });
    return new Observable<LicenseModel[]>(observer => {
      observer.next(licenseList);
    });
  }
}

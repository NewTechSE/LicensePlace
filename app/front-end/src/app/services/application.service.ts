import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationModel } from '../models/application.model';
import { LicenseTypeModel } from '../models/license-type.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  getApplications(): Observable<ApplicationModel[]> {
    const licenseTypes: LicenseTypeModel[] = [];
    Array.from({length: 3}).forEach((_, i) => {
      const licenseType = new LicenseTypeModel({
        symbol: 'Vip',
        price: i * 100,
        description: 'Description ' + i,
      });

      licenseTypes.push(licenseType);
    });

    const applicationList: ApplicationModel[] = [];
    Array.from({length: 3}).forEach((_, i) => {
      const application = new ApplicationModel({
        address: '0x' + i.toString(16),
        name: 'Application ' + i,
        cid: '0x' + i.toString(16),
        publishOn: '2019-01-01',
        logo: 'https://via.placeholder.com/150',
        version: '1.0.0',
        publisherAddress: '0x' + i.toString(16),
        publisherName: 'Publisher ' + i,
        description: 'Description ' + i,
        shortDescription: 'Short Description ' + i,
        licenseTypes: licenseTypes
      });

      applicationList.push(application);
    });

    return new Observable<ApplicationModel[]>(observer => {
      observer.next(applicationList);
    });
  }

  getApplication(address: string): Observable<ApplicationModel> {
    const licenseTypes: LicenseTypeModel[] = [];
    Array.from({length: 3}).forEach((_, i) => {
      const licenseType = new LicenseTypeModel({
        symbol: 'Vip',
        price: i * 100,
        description: 'Description ' + i,
      });

      licenseTypes.push(licenseType);
    });


    return new Observable<ApplicationModel>(observer => {
      observer.next(new ApplicationModel({
        address: address,
        name: 'Application ' + address,
        cid: address,
        publishOn: '2019-01-01',
        logo: 'https://via.placeholder.com/150',
        version: '1.0.0',
        publisherAddress: address,
        publisherName: 'Publisher ' + address,
        description: 'Description ' + address,
        shortDescription: 'Short Description ' + address,
        licenseTypes: licenseTypes
      }));
    });
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationModel } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  getApplications(): Observable<ApplicationModel[]> {
    const applicationList: ApplicationModel[] = [];
    Array.from({length: 1}).forEach((_, i) => {
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
        shortDescription: 'Short Description ' + i
      });
      applicationList.push(application);
    });

    return new Observable<ApplicationModel[]>(observer => {
      observer.next(applicationList);
    });
  }
}

import { Injectable } from '@angular/core';
import { ApplicationModel } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class SmartContractService {

  constructor() {
  }

  // TODO: implement smart contract methods

  public createApplication(app: ApplicationModel): void {
    console.log(app);
  }

  public getApplications(): void {

  }
}

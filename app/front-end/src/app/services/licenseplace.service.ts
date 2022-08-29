import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApplicationModel } from '../models/application.model';
import { LicenseplaceModel } from '../models/licenseplace.model';
import { ProviderService } from './provider.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class LicenseplaceService {
  public licenseplace: BehaviorSubject<LicenseplaceModel> = new BehaviorSubject(null);

  constructor(public providerService: ProviderService,
              public snackbarService: SnackbarService) {
  }

  public async loadLicenseplace() {
    const licenseplace = new LicenseplaceModel(this.providerService.signer.value);
    await licenseplace.init();
    this.licenseplace.next(licenseplace);
  }

  public async registerApplication(application: ApplicationModel) {
    try {
      await this.licenseplace.value.registerApp(application);
      this.snackbarService.openSuccessAnnouncement(`Register Application Success: ${application.address}`);
    } catch (error) {
      this.snackbarService.openRequestErrorAnnouncement(error);
    }
  }

  public async updateApplication(application: ApplicationModel) {
    // TODO: implement updateApplication
  }
}

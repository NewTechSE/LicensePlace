import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { LicenseModel } from '../models/license.model';
import { ProviderService } from './provider.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  constructor(public providerService: ProviderService,
              public snackbarService: SnackbarService) {
  }

  async buyFromPublisher(license: LicenseModel) {
    try {
      await license.contract.buyLicense({value: ethers.utils.parseEther(`${license.price}`)});
      this.snackbarService.openSuccessAnnouncement('License purchased successfully');
    } catch (error) {
      this.snackbarService.openRequestErrorAnnouncement(error);
    }
  }
}


import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { LicenseModel, TokenModel } from '../models/license.model';
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

  async buyLicenseToken(token: TokenModel, license: LicenseModel) {
    try {
      await license.contract.buyLicenseByTokenId(token.tokenId, {value: ethers.utils.parseEther(`${token.price}`)});
      this.snackbarService.openSuccessAnnouncement('Buy license successfully');
    } catch (error) {
      this.snackbarService.openRequestErrorAnnouncement(error);
    }
  }

  async sellingLicenseToken(token: TokenModel, license: LicenseModel, price: number) {
    try {
      await license.contract.putLicenseForSale(token.tokenId, ethers.utils.parseEther(`${price}`));
      this.snackbarService.openSuccessAnnouncement('Token in sold successfully');
    } catch (error) {
      this.snackbarService.openRequestErrorAnnouncement(error);
    }
  }
}


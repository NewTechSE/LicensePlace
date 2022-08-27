import { ObjectUtil } from '../utils/object.util';
import { ApplicationModel } from './application.model';

export interface ILicense {
  address: string;
  updatedOn: string;

  expiresOn: string;
  status: string;
  category: string;
  price: number;

  ownerAddress: string;

  applicationAddress: string;
  application: ApplicationModel;
}

export class LicenseModel extends ObjectUtil.autoImplement<ILicense>() {
  constructor(licenseShape: ILicense) {
    super();

    this.address = licenseShape.address;
    this.updatedOn = licenseShape.updatedOn;

    this.expiresOn = licenseShape.expiresOn;
    this.status = licenseShape.status;
    this.category = licenseShape.category;
    this.price = licenseShape.price;
    this.ownerAddress = licenseShape.ownerAddress;

    this.applicationAddress = licenseShape.applicationAddress;
    this.application = licenseShape.application;
  }
}

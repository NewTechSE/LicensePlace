import { ObjectUtil } from '../utils/object.util';

export interface ILicenseType {
  symbol: string;
  price: number;
  description: string;
}

export class LicenseTypeModel extends ObjectUtil.autoImplement<ILicenseType>() {
  constructor(licenseTypeShape: ILicenseType) {
    super();

    this.symbol = licenseTypeShape.symbol;
    this.price = licenseTypeShape.price;
    this.description = licenseTypeShape.description;
  }
}

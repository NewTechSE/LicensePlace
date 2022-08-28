import { ObjectUtil } from '../utils/object.util';
import { LicenseTypeModel } from './license-type.model';
import { LicenseModel } from './license.model';

export interface IApplication {
  address: string;
  name: string;
  cid: string;
  symbol: string;
  publishOn: string;

  logo: string;
  version: string;

  publisherAddress: string;
  publisherName: string;

  description: string;
  shortDescription: string;

  licenses?: LicenseModel[];
  licenseTypes: LicenseTypeModel[];
}

export class ApplicationModel extends ObjectUtil.autoImplement<IApplication>() {
  constructor(applicationShape: IApplication) {
    super();

    this.address = applicationShape.address;
    this.name = applicationShape.name;
    this.cid = applicationShape.cid;
    this.symbol = applicationShape.symbol;
    this.publishOn = applicationShape.publishOn;

    this.logo = applicationShape.logo;
    this.version = applicationShape.version;

    this.publisherAddress = applicationShape.publisherAddress;
    this.publisherName = applicationShape.publisherName;

    this.description = applicationShape.description;
    this.shortDescription = applicationShape.shortDescription;

    this.licenses = applicationShape?.licenses ?? [];
    this.licenseTypes = applicationShape?.licenseTypes ?? [];
  }

  public getLowestLicensePrice(): number {
    return this.licenseTypes?.reduce((lowestPrice, licenseType) => {
      return lowestPrice < licenseType.price ? lowestPrice : licenseType.price;
    }, 0) ?? 0;
  }
}

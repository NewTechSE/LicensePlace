import { ObjectUtil } from '../utils/object.util';
import { LicenseModel } from './license.model';

export interface IApplication {
  address: string;
  name: string;
  cid: string;
  publishOn: string;

  logo: string;
  version: string;

  publisherAddress: string;
  publisherName: string;

  description: string;
  shortDescription: string;

  licenses?: LicenseModel[];
}

export class ApplicationModel extends ObjectUtil.autoImplement<IApplication>() {
  constructor(applicationShape: IApplication) {
    super();

    this.address = applicationShape.address;
    this.name = applicationShape.name;
    this.cid = applicationShape.cid;
    this.publishOn = applicationShape.publishOn;

    this.logo = applicationShape.logo;
    this.version = applicationShape.version;

    this.publisherAddress = applicationShape.publisherAddress;
    this.publisherName = applicationShape.publisherName;

    this.description = applicationShape.description;
    this.shortDescription = applicationShape.shortDescription;

    this.licenses = applicationShape?.licenses ?? [];
  }

  public getLowestLicensePrice(): number {
    return this.licenses?.reduce((acc, curr) => {
      return acc.price < curr.price ? acc : curr;
    }, this.licenses[0])?.price ?? 0;
  }
}

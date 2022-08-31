import { Contract, Signer } from 'ethers';
import { CID } from 'ipfs-http-client';
import ApplicationArtifact from '../../../../shared/artifacts/contracts/Application.sol/Application.json';
import { IpfsUtil } from '../utils/ipfs.util';
import { ContractModel } from './contract.model';
import { LicenseModel } from './license.model';

export class ApplicationModel extends ContractModel {
  public name: string;
  public symbol: string;
  public publisher: string;
  public cid: CID;
  public licenses: { [address: string]: LicenseModel } = {};

  // TODO: update metadata on ipfs
  public publisherName: string = 'Publisher Name';
  public publishOn: Date = new Date();
  public updateOn: Date = new Date();
  public version: string = '1.0.0';
  public shortDescription: string = 'Short description of the application';
  public description: string = 'Description of the application. ' +
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';


  constructor(public override signer: Signer, public override address: string, data?: { name: string, symbol: string, cid: CID }) {
    super(signer, ApplicationArtifact, address)

    if (data) {
      this.name = data.name;
      this.symbol = data.symbol;
      this.cid = data.cid;
    }
  }

  public async init() {
    if (!this.contract) throw new Error('Deployed address not defined!')

    this.name = await this.contract.name();
    this.symbol = await this.contract.symbol();
    this.publisher = await this.contract.publisher();
    this.cid = IpfsUtil.parseToCid(await this.contract.cid());

    for (const address of await this.contract.getLicenseContracts()) {
      const license = new LicenseModel(this.signer, address);
      await license.init();
      this.licenses[address] = license;
    }

    // await this.loadLicenses()
  }

  public async createLicense(license: LicenseModel) {
    await license.deploy();
    await this.contract?.addLicenseContract(license.address);
    this.licenses[license.address] = license;
  }


  public override async deploy(): Promise<Contract> {
    this.publisher = await this.signer.getAddress();
    return super.deploy();
  }

  public override toJson() {
    return {
      name: this.name,
      symbol: this.symbol,
      publisher: this.publisher,
      cid: this.cid,
      link: IpfsUtil.cidToLink(this.cid)
    }
  }

  public override toDeployJson(): object {
    return {
      name: this.name,
      symbol: this.symbol,
      publisher: this.publisher,
      cid: this.cid.toV1().multihash.digest
    }
  }

  public override toUpdateJson(): object {
    return this.toDeployJson()
  }

  public async loadLicenses() {
    for (const address in this.licenses) {
      await this.licenses[address].init();
    }
  }

  public getLowestLicensePrice(): number {
    const minPrice = (this.licenses && Object.values(this.licenses) && Object.values(this.licenses).length)
      ? Object.values(this.licenses).reduce((min, license) => {
        return license.price < min ? license.price : min;
      }, Number.MAX_VALUE)
      : 0.0;
    return minPrice
  }
}

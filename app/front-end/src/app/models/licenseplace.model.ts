import { ethers, Signer } from 'ethers';
import LicenseplaceArtifact from '../../artifacts/contracts/LicensePlace.sol/LicensePlace.json';
import { SmartContractAddressConstant } from '../common/smart-contract-address.constant';
import { ApplicationModel } from './application.model';
import { ContractModel } from './contract.model';

export class LicenseplaceModel extends ContractModel {
  public fee: number;
  public applications: { [address: string]: ApplicationModel } = {}

  constructor(public override signer: Signer) {
    super(signer, LicenseplaceArtifact, SmartContractAddressConstant.LICENSEPLACE_SMART_CONTRACT_ADDRESS);
  }

  public async init() {
    if (!this.contract) throw new Error('Deployed address not defined!');

    this.fee = (await this.contract.appPrice());
    for (const address of await this.contract.getAppAddresses()) {
      const app = new ApplicationModel(this.signer, address);
      await app.init();
      this.applications[address] = app;
    }
  }


  public async registerApp(application: ApplicationModel) {
    await application.deploy();
    await this.contract?.registerApp(application.address, {value: ethers.utils.parseEther("9.99")});
    this.applications[application.address] = application;
  }

  public override toJson(): object {
    return {};
  }

  public override toDeployJson(): object {
    throw new Error('Permission Denied');
  }
}

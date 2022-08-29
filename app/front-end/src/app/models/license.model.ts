import { Contract, Signer } from 'ethers';
import { CID } from 'ipfs-http-client';
import LicenseArtifact from "../../artifacts/contracts/License.sol/License.json";
import { IpfsUtil } from '../utils/ipfs.util';
import { ContractModel } from './contract.model';

export class LicenseModel extends ContractModel {
  public name: string;
  public symbol: string;
  public publisher: string;
  public cid: CID;
  public price: number;

  // TODO: update metadata to ipfs
  public description: string = 'Description of the license. Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ';
  public updateOn: Date = new Date();
  public ownerAddress: string = '0xOwnerAddress';

  constructor(
    public override signer: Signer,
    public override address: string,
    data?: { name: string, symbol: string, cid: CID, price: number }
  ) {
    super(signer, LicenseArtifact, address);
    if (data) {
      this.name = data.name;
      this.symbol = data.symbol;
      this.cid = data.cid;
      this.price = data.price;
    }
  }

  public async init() {
    if (!this.contract) throw new Error('Deployed address not defined!')

    this.name = await this.contract.name();
    this.symbol = await this.contract.symbol();
    this.publisher = await this.contract.publisher();
    this.price = await this.contract.price();
    this.cid = IpfsUtil.parseToCid(await this.contract.cid());
  }

  public override async deploy(): Promise<Contract> {
    this.publisher = await this.signer.getAddress();
    return super.deploy();
  }

  public override toJson() {
    return {
      name: this.name,
      symbol: this.symbol,
      price: this.price,
      publisher: this.publisher,
      cid: this.cid,
      link: IpfsUtil.cidToLink(this.cid)
    }
  }

  public override toDeployJson(): object {
    return {
      name: this.name,
      symbol: this.symbol,
      price: this.price,
      publisher: this.publisher,
      cid: this.cid.toV1().multihash.digest
    }
  }

}

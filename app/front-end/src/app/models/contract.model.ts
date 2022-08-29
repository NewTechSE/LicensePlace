import { Contract, ContractFactory, ethers, Signer } from "ethers"

export abstract class ContractModel {
  public contract: Contract;
  private contractFactory: ContractFactory;

  protected constructor(public signer: Signer, protected artifact: any, public address: string) {
    this.contractFactory = this.getContractFactory(signer, artifact);
    this.contract = this.contractFactory.attach(address);
  }

  public abstract init(): Promise<void>;

  public abstract toJson(): object;

  public abstract toDeployJson(): object;

  private getContractFactory = (signer: Signer, artifact: any) => {
    return new ethers.ContractFactory(
      artifact.abi,
      artifact.bytecode,
      signer
    )
  }

  public async deploy(): Promise<Contract> {
    this.contract = await this.contractFactory.deploy(this.toDeployJson());
    this.address = this.contract.address;
    return this.contract;
  }

  public async update() {
    await this.contract.update(this.toDeployJson());
  }
}

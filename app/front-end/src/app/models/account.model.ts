import { BigNumber } from 'ethers';
import { ObjectUtil } from '../utils/object.util';

export interface IAccount {
  address: string;
  balance: BigNumber;
  numberOfTransactions: number;

  numberOfBlock: number;
}

export class AccountModel extends ObjectUtil.autoImplement<IAccount>() {
  constructor(accountShape: IAccount) {
    super();

    this.address = accountShape.address;
    this.balance = accountShape.balance;
    this.numberOfTransactions = accountShape.numberOfTransactions;

    this.numberOfBlock = accountShape.numberOfBlock;
  }
}

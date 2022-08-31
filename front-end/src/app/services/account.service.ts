import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccountModel } from '../models/account.model';
import { ProviderService } from './provider.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public account: BehaviorSubject<AccountModel> = new BehaviorSubject(null);

  constructor(public providerService: ProviderService) {
  }

  async getAccountInformation(): Promise<void> {
    const provider = this.providerService.provider.value;
    const signer = this.providerService.signer.value;

    if (!signer) return null;
    const account = new AccountModel({
      address: await signer.getAddress(),
      balance: await signer.getBalance(),
      numberOfTransactions: await signer.getTransactionCount(),
      numberOfBlock: await provider.getBlockNumber(),
    })

    this.account.next(account);
  }
}

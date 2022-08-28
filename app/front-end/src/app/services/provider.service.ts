import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  public provider: BehaviorSubject<ethers.providers.Web3Provider> = new BehaviorSubject(null);
  public singer: BehaviorSubject<ethers.Signer> = new BehaviorSubject(null);

  async connect() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    this.provider.next(provider);
    this.singer.next(provider.getSigner());
  }
}

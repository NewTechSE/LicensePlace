import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MetamaskAccountService {
  // public web3: Web3;

  constructor() {
  }

  async bootstrap() {
    // if (window.ethereum) {
    //   try {
    //     await window.ethereum.enable();
    //     this.web3 = new Web3(window.ethereum);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // } else if (typeof window.web3 !== 'undefined') {
    //   this.web3 = new Web3(window.web3.currentProvider);
    // } else {
    //   console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    // }
    // setInterval(() => this.getAccount(), 2000);
  }

  async getAccount() {
    // this.web3.eth.getAccounts(async (error, accounts) => {
    //   if (error) {
    //     console.error(error);
    //     return;
    //   }
    //   if (accounts.length === 0) {
    //     console.log('No accounts found');
    //     return;
    //   }
    //   console.log('Found the following accounts:', accounts);
    // }).then();
  }
}

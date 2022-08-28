import { Component, Input } from '@angular/core';
import { ethers } from 'ethers';
import { AccountModel } from '../../models/account.model';

@Component({
  selector: 'app-user-account-panel',
  templateUrl: './user-account-panel.component.html',
  styleUrls: ['./user-account-panel.component.scss']
})
export class UserAccountPanelComponent {
  @Input() item: AccountModel;
  readonly ethers = ethers;
}

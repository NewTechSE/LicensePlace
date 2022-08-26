import { Component } from '@angular/core';
import { AppSrcAssetsConstant } from '../../../common/app-src-assets.constant';

@Component({
  selector: 'app-app-card-own',
  templateUrl: './app-card-own.component.html',
  styleUrls: ['./app-card-own.component.scss']
})
export class AppCardOwnComponent {
  readonly AppSrcAssetsConstant = AppSrcAssetsConstant;

  constructor() {
  }
}

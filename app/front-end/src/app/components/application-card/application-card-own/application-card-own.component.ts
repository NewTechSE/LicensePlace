import { Component } from '@angular/core';
import { AppSrcAssetsConstant } from '../../../common/app-src-assets.constant';

@Component({
  selector: 'app-application-card-own',
  templateUrl: './application-card-own.component.html',
  styleUrls: ['./application-card-own.component.scss']
})
export class ApplicationCardOwnComponent {
  readonly AppSrcAssetsConstant = AppSrcAssetsConstant;

  constructor() {
  }
}

import { Component, OnInit } from '@angular/core';
import { AppSrcAssetsConstant } from '../../../common/app-src-assets.constant';

@Component({
  selector: 'app-license-card-own',
  templateUrl: './license-card-own.component.html',
  styleUrls: ['./license-card-own.component.scss']
})
export class LicenseCardOwnComponent implements OnInit {
  readonly AppSrcAssetsConstant = AppSrcAssetsConstant;

  constructor() {
  }

  ngOnInit(): void {
  }

}

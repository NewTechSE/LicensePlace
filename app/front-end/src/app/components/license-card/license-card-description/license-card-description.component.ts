import { Component, Input, OnInit } from '@angular/core';
import { AppSrcAssetsConstant } from '../../../common/app-src-assets.constant';
import { LicenseModel } from '../../../models/license.model';


@Component({
  selector: 'app-license-card-description',
  templateUrl: './license-card-description.component.html',
  styleUrls: ['./license-card-description.component.scss']
})
export class LicenseCardDescriptionComponent implements OnInit {
  readonly AppSrcAssetsConstant = AppSrcAssetsConstant;
  @Input() item: LicenseModel;

  constructor() {
  }

  ngOnInit() {
  }
}

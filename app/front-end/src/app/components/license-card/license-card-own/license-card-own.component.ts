import { Component, Input, OnInit } from '@angular/core';
import { AppSrcAssetsConstant } from '../../../common/app-src-assets.constant';
import { ApplicationModel } from '../../../models/application.model';
import { LicenseModel } from '../../../models/license.model';
import { ApplicationService } from '../../../services/application.service';

@Component({
  selector: 'app-license-card-own',
  templateUrl: './license-card-own.component.html',
  styleUrls: ['./license-card-own.component.scss']
})
export class LicenseCardOwnComponent implements OnInit {
  readonly AppSrcAssetsConstant = AppSrcAssetsConstant;

  @Input() item: LicenseModel;

  application: ApplicationModel;

  constructor(public applicationService: ApplicationService) {
  }

  ngOnInit(): void {
    this.getApplication();
  }

  getApplication() {
    this.applicationService.getApplication(this.item.applicationAddress).subscribe(application => {
      this.application = application;
    });
  }
}

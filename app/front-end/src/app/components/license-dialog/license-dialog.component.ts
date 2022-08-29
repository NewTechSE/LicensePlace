import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApplicationModel } from '../../models/application.model';
import { LicenseModel } from '../../models/license.model';
import { AccountService } from '../../services/account.service';
import { ApplicationService } from '../../services/application.service';
import { IpfsService } from '../../services/ipfs.service';
import { LicenseplaceService } from '../../services/licenseplace.service';
import { ProviderService } from '../../services/provider.service';
import { SnackbarService } from '../../services/snackbar.service';
import { IpfsUtil } from '../../utils/ipfs.util';
import { SubscriptionAwareAbstractComponent } from '../subscription-aware.abstract.component';

@Component({
  selector: 'app-license-dialog',
  templateUrl: './license-dialog.component.html',
  styleUrls: ['./license-dialog.component.scss']
})
export class LicenseDialogComponent extends SubscriptionAwareAbstractComponent implements OnInit {
  @Input() visible = false;

  data: LicenseModel;
  isUpdateMode: boolean = false;

  licenseFormGroup: FormGroup = new FormGroup({});

  applications: ApplicationModel[] = [];

  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public fb: FormBuilder,
              public snackbarService: SnackbarService,
              public licenseplaceService: LicenseplaceService,
              public accountService: AccountService,
              public applicationService: ApplicationService,
              public providerService: ProviderService,
              public ipfsService: IpfsService) {
    super();

    this.licenseFormGroup = this.fb.group({
      appAddress: ['', Validators.required],
      name: ['', Validators.required],
      symbol: ['', Validators.required],
      price: ['', Validators.required],
      metadataCid: ['', Validators.required],
      description: [''],
      logo: [''],
    });
  }

  ngOnInit(): void {
    this.data = this.config.data?.license || null;

    if (this.data) {
      this.isUpdateMode = true;

      this.licenseFormGroup.patchValue({
        name: this.data.name,
        symbol: this.data.symbol,
        price: this.data.price,
        metadataCid: this.data.cid,
        description: this.data.description,
      })
    }

    this.registerSubscription(
      this.licenseplaceService.licenseplace.subscribe(licenseplace => {

        this.registerSubscription(
          this.accountService.account.subscribe(account => {
            this.applications = Object.values(licenseplace.applications).filter(app => app.publisher === account.address);

            if (this.isUpdateMode) {
              this.patch('appAddress', this.applications.find(app => (
                app.licenses[this.data.address]
              )));
            }
          })
        )
      })
    );
  }

  async onSaveButtonClicked() {
    this.licenseFormGroup.markAllAsTouched();
    this.markFormDirty();

    if (this.licenseFormGroup.invalid) {
      this.snackbarService.openErrorAnnouncement('Please fill all required fields');
      return;
    }

    if (this.isUpdateMode) {
      const updateLicense = new LicenseModel(
        this.providerService.signer.value,
        this.data.address,
        {
          name: this.licenseFormGroup.get('name').value,
          symbol: this.licenseFormGroup.get('symbol').value,
          cid: this.licenseFormGroup.get('metadataCid').value,
          price: this.licenseFormGroup.get('price').value,
        }
      )
        await updateLicense.update()
      // await this.applicationService.updateLicense(updateLicense);

    } else {
      const newLicense = new LicenseModel(
        this.providerService.signer.value,
        '',
        {
          name: this.licenseFormGroup.get('name').value,
          symbol: this.licenseFormGroup.get('symbol').value,
          cid: this.licenseFormGroup.get('metadataCid').value,
          price: parseFloat(this.licenseFormGroup.get('price').value),
        }
      )

      const application = this.applications.find(app => app.address === this.licenseFormGroup.get('appAddress').value);

      await this.applicationService.createLicense(application, newLicense);
    }
  }

  patch(field: string, value: any) {
    this.licenseFormGroup.patchValue({
      ...this.licenseFormGroup.value,
      [field]: value
    });
  }

  onLogoFileChanged(event: any) {
    const formFiles = event.files;
    if (!formFiles || formFiles?.length === 0) {
      this.snackbarService.openErrorAnnouncement('Please select a logo file');
      return;
    }

    const logoFile = formFiles[0];
    this.patch('logo', logoFile);
  }

  async onUploadMetadataToIpfsButtonClicked() {
    if (!this.licenseFormGroup.get('logo').value) {
      this.snackbarService.openErrorAnnouncement('Please select a logo file');
      return;
    }

    const logoCid = await this.ipfsService.upload(this.licenseFormGroup.get('logo').value);
    this.patch('metadataCid', logoCid);
  }

  onResetButtonClicked() {
    if (this.data) {
      this.licenseFormGroup.patchValue({
        name: this.data.name,
        symbol: this.data.symbol,
        metadataCid: IpfsUtil.cidToLink(this.data.cid),
        shortDescription: '',
        description: '',
        logoCid: '',
      })
    } else {
      this.licenseFormGroup.reset();
    }
  }

  markFormDirty() {
    Object.keys(this.licenseFormGroup.controls).forEach(key => {
      this.licenseFormGroup.get(key).markAsDirty();
    });
  }
}

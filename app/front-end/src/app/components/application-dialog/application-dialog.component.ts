import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApplicationModel } from '../../models/application.model';
import { IpfsService } from '../../services/ipfs.service';
import { LicenseplaceService } from '../../services/licenseplace.service';
import { ProviderService } from '../../services/provider.service';
import { SnackbarService } from '../../services/snackbar.service';
import { IpfsUtil } from '../../utils/ipfs.util';

@Component({
  selector: 'app-application-dialog',
  templateUrl: './application-dialog.component.html',
  styleUrls: ['./application-dialog.component.scss']
})
export class ApplicationDialogComponent implements OnInit {
  @Input() visible = false;

  data: ApplicationModel;
  isUpdateMode: boolean = false;

  applicationFormGroup: FormGroup = new FormGroup({});

  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public fb: FormBuilder,
              public snackbarService: SnackbarService,
              public licenseplaceService: LicenseplaceService,
              public providerService: ProviderService,
              public ipfsService: IpfsService) {

    this.applicationFormGroup = this.fb.group({
      name: ['', Validators.required],
      symbol: ['', Validators.required],
      metadataCid: ['', Validators.required],
      publisherName: [''],
      shortDescription: [''],
      description: [''],
      logo: [''],
    });
  }

  ngOnInit(): void {
    this.data = this.config.data?.application || null;

    if (this.data) {
      this.isUpdateMode = true;

      this.applicationFormGroup.patchValue({
        name: this.data.name,
        symbol: this.data.symbol,
        metadataCid: this.data.cid,
        publisherName: this.data.publisherName,
        shortDescription: this.data.shortDescription,
        description: this.data.description,
      })
    }
  }

  patch(field: string, value: any) {
    this.applicationFormGroup.patchValue({
      ...this.applicationFormGroup.value,
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

  async onUploadLogoToIpfsButtonClicked() {
    const logoCid = await this.ipfsService.upload(this.applicationFormGroup.get('logo').value);
    this.patch('logoCid', logoCid);
  }

  async onUploadMetadataToIpfsButtonClicked() {
    if (!this.applicationFormGroup.get('logo').value) {
      this.snackbarService.openErrorAnnouncement('Please select a logo file');
      return;
    }

    const logoCid = await this.ipfsService.upload(this.applicationFormGroup.get('logo').value);
    this.patch('metadataCid', logoCid);
  }

  onResetButtonClicked() {
    if (this.data) {
      this.applicationFormGroup.patchValue({
        name: this.data.name,
        symbol: this.data.symbol,
        metadataCid: IpfsUtil.cidToLink(this.data.cid),
        shortDescription: '',
        description: '',
        logoCid: '',
      })
    } else {
      this.applicationFormGroup.reset();
    }
  }

  async onSaveButtonClicked() {
    this.applicationFormGroup.markAllAsTouched();
    this.markFormDirty();

    if (this.applicationFormGroup.invalid) {
      this.snackbarService.openErrorAnnouncement('Please fill all required fields');
      return;
    }

    if (this.isUpdateMode) {
      // TODO: use updateApplication method
      const application = new  ApplicationModel(
        this.providerService.signer.value,
        this.applicationFormGroup.get('address').value,
        {
          name: this.applicationFormGroup.get('name').value,
          symbol: this.applicationFormGroup.get('symbol').value,
          cid: this.applicationFormGroup.get('metadataCid').value,
        }
      )
      application.publisher = this.applicationFormGroup.get('publisher').value
      await application.update()
      
    } else {
      const newApplication = new ApplicationModel(
        this.providerService.signer.value,
        '',
        {
          name: this.applicationFormGroup.get('name').value,
          symbol: this.applicationFormGroup.get('symbol').value,
          cid: this.applicationFormGroup.get('metadataCid').value,
        }
      )

      await this.licenseplaceService.registerApplication(newApplication);
    }
  }

  markFormDirty() {
    Object.keys(this.applicationFormGroup.controls).forEach(key => {
      this.applicationFormGroup.get(key).markAsDirty();
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApplicationModel } from '../../models/application.model';
import { IpfsService } from '../../services/ipfs.service';
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

  applicationFormGroup: FormGroup = new FormGroup({});

  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public fb: FormBuilder,
              public snackbarService: SnackbarService,
              public ipfsService: IpfsService) {

    this.applicationFormGroup = this.fb.group({
      name: ['', Validators.required],
      symbol: ['', Validators.required],
      shortDescription: [''],
      description: [''],
      logoCid: ['', Validators.required],
      logo: [''],
    });
  }

  ngOnInit(): void {
    this.data = this.config.data?.application || null;

    if (this.data) {
      this.applicationFormGroup.patchValue({
        name: this.data.name,
        symbol: this.data.symbol,
        shortDescription: this.data.shortDescription,
        description: this.data.description,
        logoCid: IpfsUtil.cidToLink(this.data.cid),
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
    const formFiles = event.target?.files;
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

  onResetButtonClicked() {
    if (this.data) {
      this.applicationFormGroup.patchValue({
        name: this.data.name,
        symbol: this.data.symbol,
        shortDescription: this.data.shortDescription,
        description: this.data.description,
        logoCid: IpfsUtil.cidToLink(this.data.cid),
      })
    } else {
      this.applicationFormGroup.reset();
    }
  }

  onSaveButtonClicked() {
    this.applicationFormGroup.markAllAsTouched();
    this.markFormDirty();

    if (this.applicationFormGroup.invalid) {
      this.snackbarService.openErrorAnnouncement('Please fill all required fields');
      return;
    }

    alert('Save application');

  }

  markFormDirty() {
    Object.keys(this.applicationFormGroup.controls).forEach(key => {
      this.applicationFormGroup.get(key).markAsDirty();
    });
  }
}

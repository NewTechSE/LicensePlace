import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApplicationModel } from '../../models/application.model';

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
              public fb: FormBuilder) {

    this.applicationFormGroup = this.fb.group({
      name: ['', Validators.required],
      symbol: ['', Validators.required],
      shortDescription: ['', Validators.required],
      description: ['', Validators.required],
      logoCid: ['', Validators.required],
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
        logoCid: this.data.logo
      })
    }
  }

  patch(field: string, value: any) {
    this.applicationFormGroup.patchValue({
      ...this.applicationFormGroup.value,
      [field]: value
    });
  }

  onUploadLogoToIpfsButtonClicked() {
    alert('Upload logo to IPFS');
  }

  onResetButtonClicked() {
    if (this.data) {
      this.applicationFormGroup.patchValue({
        name: this.data.name,
        symbol: this.data.symbol,
        shortDescription: this.data.shortDescription,
        description: this.data.description,
        logoCid: this.data.logo
      })
    } else {
      this.applicationFormGroup.reset();
      console.log('reset');
    }
  }

  onSaveButtonClicked() {
    this.applicationFormGroup.markAllAsTouched();
    this.markFormDirty();
  }

  markFormDirty() {
    Object.keys(this.applicationFormGroup.controls).forEach(key => {
      this.applicationFormGroup.get(key).markAsDirty();
    });
  }
}

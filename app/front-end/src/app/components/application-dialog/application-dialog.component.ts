import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApplicationModel } from '../../models/application.model';

@Component({
  selector: 'app-application-dialog',
  templateUrl: './application-dialog.component.html',
  styleUrls: ['./application-dialog.component.scss']
})
export class ApplicationDialogComponent implements OnInit {
  @Input() visible = false;

  application: ApplicationModel;

  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig) {

  }

  ngOnInit(): void {
    this.application = this.config.data.application;
  }

}

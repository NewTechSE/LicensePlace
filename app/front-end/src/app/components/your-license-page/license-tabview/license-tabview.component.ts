import { Component, OnInit } from '@angular/core';
import { SizeEnum } from '../../../enums/size.enum';

@Component({
  selector: 'app-license-tabview',
  templateUrl: './license-tabview.component.html',
  styleUrls: ['./license-tabview.component.scss']
})
export class LicenseTabviewComponent implements OnInit {
  readonly SizeEnum = SizeEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

}

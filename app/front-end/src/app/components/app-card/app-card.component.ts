import { Component, OnInit } from '@angular/core';
import { AppSrcAssetsConstant } from '../../common/app-src-assets.constant';

@Component({
  selector: 'app-app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.scss']
})
export class AppCardComponent implements OnInit {
  readonly AppSrcAssetsConstant = AppSrcAssetsConstant;

  constructor() {
  }

  ngOnInit(): void {
  }

}

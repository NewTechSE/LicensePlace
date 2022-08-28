import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppRouteConstant } from '../../common/app-route.constant';
import { AppSrcAssetsConstant } from '../../common/app-src-assets.constant';
import { SubscriptionAwareAbstractComponent } from '../subscription-aware.abstract.component';
import { NavbarItems } from './navbar-items.constant';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends SubscriptionAwareAbstractComponent {
  readonly AppSrcAssetsConstant = AppSrcAssetsConstant;
  readonly AppRouteConstant = AppRouteConstant;

  items: MenuItem[] = NavbarItems;

  constructor() {
    super();
  }
}

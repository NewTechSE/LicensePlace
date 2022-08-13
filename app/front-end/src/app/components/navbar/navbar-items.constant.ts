import { MenuItem } from 'primeng/api';
import { AppRouteConstant } from '../../common/app-route.constant';

export const NavbarItems: MenuItem[] = [
  {
    label: 'License Dashboard',
    routerLink: [`/${AppRouteConstant.LICENSE_DASHBOARD}`]
  }, {
    label: 'Buy License',
    routerLink: [`/${AppRouteConstant.BUY_LICENSE}`]
  }, {
    label: 'Sell License',
    routerLink: [`/${AppRouteConstant.SELL_LICENSE}`]
  }
];

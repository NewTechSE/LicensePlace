import { MenuItem } from 'primeng/api';
import { AppRouteConstant } from '../../common/app-route.constant';

export const NavbarItems: MenuItem[] = [
  {
    label: 'Licenseplace Dashboard',
    routerLink: [`/${AppRouteConstant.LICENSEPLACE_DASHBOARD}`]
  }, {
    label: 'Your Application',
    routerLink: [`/${AppRouteConstant.YOUR_APPLICATION}`]
  }, {
    label: 'Your License',
    routerLink: [`/${AppRouteConstant.YOUR_LICENSE}`]
  }
];

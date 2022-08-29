import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SizeEnum } from '../../../enums/size.enum';
import { TokenModel } from '../../../models/license.model';
import { LicenseplaceService } from '../../../services/licenseplace.service';
import { ArrayUtil } from '../../../utils/array.util';
import { SubscriptionAwareAbstractComponent } from '../../subscription-aware.abstract.component';

@Component({
  selector: 'app-token-tabview',
  templateUrl: './token-tabview.component.html',
  styleUrls: ['./token-tabview.component.scss']
})
export class TokenTabviewComponent extends SubscriptionAwareAbstractComponent implements OnInit, OnChanges {
  readonly SizeEnum = SizeEnum;

  @Input() tokens: TokenModel[] = [];

  searchFilter: string = '';
  tokensFiltered: TokenModel[] = [];

  constructor(public licenseplaceService: LicenseplaceService) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const tokenPrevious = changes['tokens']?.previousValue;
    const tokenCurrent = changes['tokens']?.currentValue;

    const changedRes = !tokenPrevious
      || !ArrayUtil.equals(tokenPrevious, tokenCurrent, (b1: TokenModel, b2: TokenModel) => (
        b1.tokenId - b2.tokenId
      ));

    if (changedRes) {
      this.tokens = changes['tokens'].currentValue ?? [];
      this.search(this.searchFilter);
    }
  }

  search(keyword: string) {
    this.searchFilter = keyword;
    this.tokensFiltered = this.tokens.filter(license => (
      license.tokenId === parseInt(keyword)
      || license.price === parseInt(keyword)
      // || license.publisher.toLowerCase().includes(keyword.toLowerCase())
    ));
  }
}

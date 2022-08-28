import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SizeEnum } from '../../enums/size.enum';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
  @Input() size: SizeEnum; // small medium
  @Input() placeholder: string = 'Enter your keyword ...';
  readonly SizeEnum = SizeEnum;

  @Output() keywordChangedEmitter = new EventEmitter<string>();
}

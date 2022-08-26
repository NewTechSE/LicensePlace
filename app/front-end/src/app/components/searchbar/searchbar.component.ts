import { Component, Input, OnInit } from '@angular/core';
import { SizeEnum } from '../../enums/size.enum';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  @Input() size: SizeEnum; // small medium
  readonly SizeEnum = SizeEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

}

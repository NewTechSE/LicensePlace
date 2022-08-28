import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading: BehaviorSubject<boolean> = new BehaviorSubject(null);

  constructor() {
  }

  show() {
    this.loading.next(true);
  }

  hide() {
    this.loading.next(false);
  }
}


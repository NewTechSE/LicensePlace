import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class SubscriptionAwareAbstract implements OnDestroy {
  protected subscriptions: Subscription[] = [];

  registerSubscription(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

  registerSubscriptions(subscriptions: Subscription[]): void {
    subscriptions.forEach(subscription => this.registerSubscription(subscription));
  }

  clearSubscriptions(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }

  ngOnDestroy(): void {
    this.clearSubscriptions();
  }
}

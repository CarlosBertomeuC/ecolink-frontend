import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { SubscriptionPopupComponent } from './components/subscription-popup/subscription-popup.component';
import { SubscriptionPlansComponent } from './pages/subscription-plans/subscription-plans.component';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    SubscriptionPopupComponent,
    SubscriptionPlansComponent
  ],
  imports: [
    CommonModule,
    SubscriptionsRoutingModule,
    SharedModule
]
})
export class SubscriptionsModule { }

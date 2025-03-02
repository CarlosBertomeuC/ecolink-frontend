import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { SubscriptionPopupComponent } from './components/subscription-popup/subscription-popup.component';
import { SubscriptionPlansComponent } from './pages/subscription-plans/subscription-plans.component';
import { SubscriptionPaymentComponent } from './components/subscription-payment/subscription-payment.component';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SubscriptionPopupComponent,
    SubscriptionPlansComponent,
    SubscriptionPaymentComponent,
  ],
  imports: [
    CommonModule,
    SubscriptionsRoutingModule,
    SharedModule,
    FormsModule
]
})
export class SubscriptionsModule { }

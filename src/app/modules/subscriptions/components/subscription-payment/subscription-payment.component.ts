import { Component, Input } from '@angular/core';
import { Payment } from '../../services/payment.service';

@Component({
  selector: 'app-subscription-payment',
  templateUrl: './subscription-payment.component.html',
  styleUrl: './subscription-payment.component.scss'
})
export class SubscriptionPaymentComponent {
  @Input() subscriptionType: string = '';
  cardNumber: string = '';
  cardExpiry: string = '';
  cardCVC: string = '';
  durationDays: number = 30; // Default duration
  isPaying: boolean = false;

  constructor(private subscriptionService: Payment) {}

  onSubmit() {
    this.isPaying = true;
    const paymentRequest = {
      cardNumber: this.cardNumber,
      cardExpiry: this.cardExpiry,
      cardCVC: this.cardCVC,
      subscriptionType: this.subscriptionType,
      durationDays: this.durationDays
    };
    setTimeout(() => {
      this.isPaying = false;
      this.subscriptionService.paySubscription(paymentRequest).subscribe();
      window.location.reload();
    }, 2000);
  }
}

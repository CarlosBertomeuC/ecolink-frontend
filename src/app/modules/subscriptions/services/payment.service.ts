import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface PaymentRequest {
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
  subscriptionType: string;
  durationDays: number;
}

@Injectable({
  providedIn: 'root'
})
export class Payment {
  private apiUrl = `${environment.apiUrl}/subscriptions`;

  constructor(private http: HttpClient) {}

  paySubscription(paymentRequest: PaymentRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/pay`, paymentRequest , { withCredentials: true });
  }
}
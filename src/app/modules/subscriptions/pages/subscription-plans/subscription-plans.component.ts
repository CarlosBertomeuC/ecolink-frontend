import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { AuthService } from '../../../../auth/services/AuthService.service';
import { User } from '../../../../core/models/User';
import { SubscriptionService } from '../../services/subscription.service';
import { SubscriptionType } from '../../models/subscription';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.scss']
})
export class SubscriptionPlansComponent {
  constructor(private authService: AuthService, private subscriptionService: SubscriptionService) {}
  isLogged: boolean = false;
  isClient: boolean = false;
  isStartup: boolean = false;
  isCompany: boolean = false;
  userType: 'client' | 'company' | 'startup' | null = null;
  planType: string = '';
  showPaymentForm: boolean = false;
  selectedPlan: string = '';

  ngOnInit(): void {
      this.authService.getCurrentUser().subscribe((user: User) => {
        this.isLogged = !!user;
        if (user) {
          if (user.userType.toUpperCase() === 'CLIENT') {
            this.isClient = true;
            this.userType = 'client';
          } else if (user.userType.toUpperCase() === 'STARTUP') {
            this.isStartup = true;
            this.userType = 'startup';
          } else if (user.userType.toUpperCase() === 'COMPANY') {
            this.isCompany = true;
            this.userType = 'company';
          }
        }
      });
      this.subscriptionService.getUserSubscription().subscribe(
        (response) => {
          this.planType = response.planType;
        },
        (error) => {
          console.error('Error al obtener la suscripción', error);
        }
      );
    }


    subscribeUser(type: string, duration: number): void {
      const enumType = type.toUpperCase() as SubscriptionType;
  
      if (!['FREE', 'PREMIUM', 'ENTERPRISE'].includes(enumType)) {
        console.error('Tipo de suscripción inválido:', type);
        return;
      }
  
      if (this.showPaymentForm) {
        this.subscriptionService.subscribeUser(enumType, duration).subscribe(
          (response) => {
            console.log('Subscription successful:', response);
            this.planType = enumType;
            this.showPaymentForm = false;
          },
          error => {
            console.error('Error suscribing the user', error);
          }
        );
      } else {
        this.selectedPlan = enumType;
        this.showPaymentForm = true;
      }
    }


    showCancelModal(): void {
      const cancelModalElement = document.getElementById('cancelModal');
      if (cancelModalElement) {
        const cancelModal = new bootstrap.Modal(cancelModalElement);
        cancelModal.show();
      } else {
        console.error('Cancel modal element not found');
      }
    }
  
    confirmCancel(): void {
      this.subscriptionService.cancelSubscription().subscribe(
        response => {
          console.log('Subscription cancelled successfully:', response);
          window.location.reload();
        },
        error => {
          console.error('Error cancelling subscription:', error);
        }
      );
    }
}

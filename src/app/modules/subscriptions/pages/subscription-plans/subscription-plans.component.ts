import { Component } from '@angular/core';
import { AuthService } from '../../../../auth/services/AuthService.service';
import { User } from '../../../../core/models/User';
import { SubscriptionService } from '../../services/subscription.service';

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
      this.subscriptionService.subscribeUser(type, duration).subscribe(
        (response) => {
          console.log('Subscription successful:', response);
          this.planType = type;
        },
        (error) => {
          console.error('Subscription failed:', error);
        }
      );
    }
}

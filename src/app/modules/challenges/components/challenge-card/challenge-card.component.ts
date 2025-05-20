import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../../../../core/models/Challenges';
import { SubscriptionService } from '../../../subscriptions/services/subscription.service';
import { Router } from '@angular/router';

@Component({
  selector: 'challenge-card',
  templateUrl: './challenge-card.component.html',
  styleUrls: ['./challenge-card.component.scss']
})
export class ChallengeCardComponent implements OnInit {
  @Input() challenge!: Challenge;
  planType: string = '';

  constructor(private subscriptionService: SubscriptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkSubscription();
  }

  checkSubscription(): void {
    this.subscriptionService.getUserSubscription().subscribe(
      (response) => {
        this.planType = response.planType.toLowerCase();
      },
      (error) => {
        console.error('Error fetching subscription', error);
      }
    );
  }
  goToSubscriptions(): void {
  this.router.navigate(['/subscriptions']);
  }
}


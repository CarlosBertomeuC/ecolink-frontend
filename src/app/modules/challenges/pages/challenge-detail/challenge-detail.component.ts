import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeService } from '../../services/challenge.service';
import { Challenge } from '../../../../core/models/Challenge';
import { User } from '../../../../core/models/User';
import { AuthService } from '../../../../auth/services/AuthService.service';
import { SubscriptionService } from '../../../subscriptions/services/subscription.service';

@Component({
  selector: 'challenge-detail',
  templateUrl: './challenge-detail.component.html',
  styleUrl: './challenge-detail.component.scss',
})
export class ChallengeDetailComponent {
  challengeId: string | null = null;
  challenge!: Challenge;
  isStartup: boolean = false;
  today: Date = new Date();
  planType: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private challengeService: ChallengeService,
    private authService: AuthService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.today.setHours(0, 0, 0, 0);
    this.challengeId = this.route.snapshot.paramMap.get('id');

    this.subscriptionService.getUserSubscription().subscribe({
      next: (res) => {
        this.planType = res.planType.toLowerCase();
        this.loadChallenge();
      },
      error: () => {
        this.router.navigate(['/subscriptions']);
      }
    });

    this.challengeService.getCurrentUser().subscribe((user: User) => {
      if (user.userType.toUpperCase() === 'STARTUP') {
        this.isStartup = true;
      }
    });
  }

  loadChallenge(): void {
    if (!this.challengeId) return;

    this.challengeService.getChallengeById(this.challengeId).subscribe({
      next: (challenge: Challenge) => {
        if (challenge.premium && this.planType === 'free') {
          this.router.navigate(['/subscriptions']);
          return;
        }

        challenge.endDate = new Date(challenge.endDate);
        challenge.endDate.setHours(0, 0, 0, 0);
        this.challenge = challenge;

        for (let i = 0; i < challenge.odsList.length; i++) {
          this.authService.getImage('ods', challenge.odsList[i].image).subscribe((imageUrl: string) => {
            this.challenge.odsList[i].image = imageUrl;
          });
        }

        if (challenge.company?.imageUrl) {
          this.authService.getImage('user', challenge.company.imageUrl).subscribe((imageUrl: string) => {
            if (this.challenge.company) {
              this.challenge.company.imageUrl = imageUrl;
            }
          });
        }
      },
      error: () => {
        this.router.navigate(['/not-found']);
      }
    });
  }
}

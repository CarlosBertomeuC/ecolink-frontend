import { Component, OnInit } from '@angular/core';
import { CompanyChallengeService } from '../../services/company-challenge.service';
import { Challenge } from '../../../../core/models/Challenge';
import { SubscriptionService } from '../../../subscriptions/services/subscription.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-challenges',
  templateUrl: './company-challenges.component.html',
  styleUrls: ['./company-challenges.component.scss'],
})
export class CompanyChallengesComponent implements OnInit {
  challenges: Challenge[] = [];
  planType: string = '';

  constructor(
    private challengeService: CompanyChallengeService,
    private subscriptionService: SubscriptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkSubscription();
    this.getChallenges();
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

  getChallenges(): void {
    this.challengeService.getCompanyChallenges().subscribe((challenges: Challenge[]) => {
      this.challenges = challenges;
    });
  }

  canAddChallenge(): boolean {
    if (this.planType === 'free' && this.challenges.length >= 1) {
      return false;
    }
    if (this.planType === 'premium' && this.challenges.length >= 5) {
      return false;
    }
    return true;
  }

  addChallenge(): void {
    if (this.canAddChallenge()) {
      this.router.navigate(['/company-dashboard/challenges/new']);
    } else {
      this.router.navigate(['/subscriptions']);
    }
  }

  deleteChallenge(id: number): void {
    this.challengeService.deleteChallenge(id).subscribe(() => {
      this.getChallenges();
    });
  }
}

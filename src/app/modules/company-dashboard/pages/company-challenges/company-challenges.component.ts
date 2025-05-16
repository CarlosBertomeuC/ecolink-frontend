import { Component, OnInit } from '@angular/core';
import { CompanyChallengeService } from '../../services/company-challenge.service';
import { Challenge } from '../../../../core/models/Challenge';
import { SubscriptionService } from '../../../subscriptions/services/subscription.service';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-company-challenges',
  templateUrl: './company-challenges.component.html',
  styleUrls: ['./company-challenges.component.scss'],
})
export class CompanyChallengesComponent implements OnInit {
  challenges: Challenge[] = [];
  planType: string = '';
  loading: boolean = false;
  selectedChallenge: Challenge | null = null;

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
    this.challengeService
      .getCompanyChallenges()
      .subscribe((challenges: Challenge[]) => {
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
      this.goToSubscriptions();
    }
  }
  goToSubscriptions(): void {
    this.router.navigate(['/subscriptions']);
  }
  openConfirmationModal(challenge: Challenge): void {
    this.selectedChallenge = challenge;
  }
  confirmUpgrade(): void {
    if (!this.selectedChallenge) return;

    this.loading = true;

    this.challengeService.upgradeChallenge(this.selectedChallenge.id).subscribe(
      () => {
        this.loading = false;
        const modalEl = document.getElementById('confirmUpgradeModal');
        if (modalEl) {
          const modalInstance = bootstrap.Modal.getInstance(modalEl);
          modalInstance?.hide();
        }
        this.getChallenges();
      },
      () => {
        this.loading = false;
      }
    );
  }

  deleteChallenge(id: number): void {
    this.challengeService.deleteChallenge(id).subscribe(() => {
      this.getChallenges();
    });
  }
}

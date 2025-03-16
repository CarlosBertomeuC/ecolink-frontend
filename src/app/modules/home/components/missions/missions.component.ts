import { Component, OnInit } from '@angular/core';
import { Mission } from '../../../../core/models/Mission';
import { AuthService } from '../../../../auth/services/AuthService.service';
import { User } from '../../../../core/models/User';
import { MissionService } from '../../services/mission.service';
import { SubscriptionService } from '../../../subscriptions/services/subscription.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {
  missions: Mission[] = [];
  isClient: boolean = false;
  planType: string = '';

  constructor(
    private missionService: MissionService,
    private authService: AuthService,
    private subscriptionService: SubscriptionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.missionService.getMission().subscribe((missions: Mission[]) => {
      this.missions = missions;
    });
    this.authService.getCurrentUser().subscribe((user: User) => {
      this.isClient = user.userType === 'CLIENT';
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

  completeMission(mission: Mission, index: number): void {
    if (this.planType.toLowerCase() !== 'premium' && index >= 2) {
      this.router.navigate(['/subscriptions']);
    } else {
      mission.completed = true;
      this.missionService.updateMission(mission).subscribe();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StartupService } from '../../../services/StartupService.service';
import { Startup } from '../../../home/models/Startup';

@Component({
  selector: 'app-startup-detail',
  templateUrl: './startup-detail.component.html',
  styleUrl: './startup-detail.component.scss'
})
export class StartupDetailComponent implements OnInit {
  startupId: string | null = null;
  startup: Startup | null = null;
  notFound = false;

  constructor(private route: ActivatedRoute, private startupService: StartupService) {}

  ngOnInit(): void {
    this.startupId = this.route.snapshot.paramMap.get('id');
    if(this.startupId === null) return;
    this.startupService.findStartupById(this.startupId).subscribe((startup: Startup) => {
      this.startup = startup;
    }, error => {
      this.notFound = true;
    });
  }
}

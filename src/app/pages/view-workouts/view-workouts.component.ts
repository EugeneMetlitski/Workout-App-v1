import { WebService } from './../../services/web.service';
import { Component } from '@angular/core';
import { Workout } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-workouts',
  templateUrl: './view-workouts.component.html',
  styleUrls: ['./view-workouts.component.scss']
})
export class ViewWorkoutsComponent {

  workouts: Workout[];

  constructor(
    private webService: WebService,
    private router: Router
  ) {
    this.webService.getAllWorkouts((res) => {
      this.workouts = res;
    });
  }

  templates() {
    this.router.navigate(['/workout-app/templates']);
  }

}

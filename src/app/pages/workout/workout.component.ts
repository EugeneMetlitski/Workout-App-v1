import { WebService } from 'src/app/services/web.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent {

  private feedback = { txt: '', bg: 'green' };

  constructor(
    private router: Router,
    private webService: WebService,
    private data: DataService,
    private auth: AuthService
  ) {
    this.data.title = 'Workout';
    this.data.subtitle = this.data.dateToString(new Date());
  }

  logout() {
    this.auth.logout();
  }

  saveWorkout() {
    this.provideFeedback('Processing...', 'grey', true);

    this.webService.saveWorkout((msg: string, color: string) => {
      this.provideFeedback(msg, color);
    });
  }

  saveTemplates() {
    this.provideFeedback('Processing...', 'grey', true);

    this.webService.saveTemplates((msg: string, color: string) => {
      this.provideFeedback(msg, color);
    });
  }

  private provideFeedback(txt: string, bg?: string, cancelClear?: boolean) {
    this.feedback.bg = bg ? bg : 'green';
    this.feedback.txt = txt;

    if (!cancelClear) {
      setTimeout(() => {
        this.feedback.txt = '';
      }, 2500);
    }
  }

}

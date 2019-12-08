import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, DataService, Workout, WorkoutTemplate } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  // homeUrl = 'https://localhost:44360';
  homeUrl = 'https://em-portfolio.azurewebsites.net';

  constructor(
    private http: HttpClient,
    private data: DataService,
    private auth: AuthService
  ) { }

  login(values: JSON, cb: Function) {
    const url = `${this.homeUrl}/api/login`;
    this.http.post(url, values).subscribe((res: Response) => {
      if (res.success && res.token) {
        this.auth.login(res.token);
        this.data.user = res.user;
        this.data.setSavedUser();
        cb(true);
      } else {
        cb(false, res.message, res.color);
      }
    });
  }

  register(values: User, cb: Function) {
    const url = `${this.homeUrl}/api/register`;
    this.http.post(url, values).subscribe((res: Response) => {
      if (res.success && res.token) {
        this.auth.login(res.token);
        this.data.user = res.user;
        this.data.setSavedUser();
        cb(true);
      } else {
        cb(false, res.message, res.color);
      }
    });
  }

  saveTemplates(cb: Function) {
    // If data has not changed
    if (this.data.canSaveTemplates()) {
      cb('Data has not changed!', 'orange');

    } else {
      const url = `${this.homeUrl}/api/templates`;
      this.http.post(url, this.data.user, this.auth.getHeaders()).subscribe((res: Response) => {

        if (res.success) {
          this.data.setSavedUser();
          cb('Saved Successfully!', 'green');
        } else {
          cb(res.message, res.color);
        }
      });
    }
  }

  saveWorkout(cb: Function) {
    const isNewWorkout = this.data.saveWorkout();

    // If data has not changed
    if (!this.data.hasWorkoutChanged()) {
      cb('Data has not changed!', 'orange');

    } else {

      if (isNewWorkout) {
        const url = `${this.homeUrl}/api/workouts/post`;
        this.http.post(url, this.data.workout, this.auth.getHeaders()).subscribe((res: Response) => {
          if (res.success) {
            this.data.workout = res.workout;
            this.data.setSaveWorkout();
            cb('Saved Successfully!', 'green');
          } else {
            cb(res.message, res.color);
          }
        });

      } else {
        const url = `${this.homeUrl}/api/workouts/update`;
        this.http.post(url, this.data.workout, this.auth.getHeaders()).subscribe((res: Response) => {
          if (res.success) {
            this.data.setSaveWorkout();
            cb('Updated Successfully!', 'green');
          } else {
            cb(res.message, res.color);
          }
        });
      }
    }
  }

  getAllWorkouts(cb: Function) {
    const url = `${this.homeUrl}/api/workouts/get`;
    this.http.get(url, this.auth.getHeaders()).subscribe((res: Workout[]) => {
      cb(res);
    });

    // const w: Workout = {
    //   workoutId: 0,
    //   identificationOfUser: 1,
    //   name: 'Hello Worls',
    //   date: new Date(),
    //   workoutSets: [
    //     {
    //       workoutSetId: 0,
    //       place: 1,
    //       workoutExercises: [
    //         {
    //           workoutExerciseId: 0,
    //           place: 1,
    //           name: 'Bla',
    //           kg: 12.4,
    //           workoutReps: [
    //             {
    //               workoutRepId: 0,
    //               place: 2,
    //               value: 55
    //             }
    //           ]
    //         }
    //       ]
    //     }
    //   ],
    // };
    // return [ w, w, w ];
  }

}

interface Response {
  success: boolean;
  token: string;
  message: string;
  color: string;
  user: User;
  workout: Workout;
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  title = 'Templates';
  subtitle = 'Select a template';
  user: User;
  user_saved: User;
  selectedTemplate: number;
  workout: Workout;
  workout_saved: Workout;

  addNewTemplate(name: string) {
    this.user.workoutTemplates.push({
      workoutTemplateId: 0,
      place: (this.user.workoutTemplates.length > 0) ?
        this.user.workoutTemplates[this.user.workoutTemplates.length - 1].place + 1 :
        0,
      name: name,
      sets: []
    });
  }

  deleteTemplate(name: string) {
    let found = false;
    for (let i = 0; i < this.user.workoutTemplates.length; i++) {

      if (found) {
        this.user.workoutTemplates[i].place = this.user.workoutTemplates[i - 1].place + 1;

      } else {
        if (this.user.workoutTemplates[i].name === name) {
          found = true;

          if (i < this.user.workoutTemplates.length - 1) {
            this.user.workoutTemplates[i + 1].place = this.user.workoutTemplates[i].place;
          }

          this.user.workoutTemplates.splice(i, 1);
        }
      }
    }
  }

  addNewSet() {
    const length = this.user.workoutTemplates[this.selectedTemplate].sets.length;
    this.user.workoutTemplates[this.selectedTemplate].sets.push({
      setId: 0,
      place: (length > 0) ?
        this.user.workoutTemplates[this.selectedTemplate].sets[length - 1].place + 1 :
        0,
      exercises: []
    });
  }

  deleteSet(place: number) {
    const sets = this.user.workoutTemplates[this.selectedTemplate].sets;
    const length = sets.length;

    let found = false;
    for (let i = 0; i < this.user.workoutTemplates[this.selectedTemplate].sets.length; i++) {

      if (found) {
        sets[i].place = sets[i - 1].place + 1;

      } else {
        if (sets[i].place === place) {
          found = true;

          if (i < length - 1) {
            sets[i + 1].place = sets[i].place;
          }

          sets.splice(i, 1);
        }
      }
    }
  }

  addNewExercise(setPlace: number, name: string, kg: number) {
    const length = this.user.workoutTemplates[this.selectedTemplate].sets[setPlace].exercises.length;
    this.user.workoutTemplates[this.selectedTemplate].sets[setPlace].exercises.push({
      exerciseId: 0,
      place: (length > 0) ?
        this.user.workoutTemplates[this.selectedTemplate].sets[setPlace].exercises[length - 1].place + 1 :
        0,
      name: name,
      kg: kg,
      reps: []
    });
  }

  deleteExercise(setPlace: number, exercisePlace: number) {
    const exercises = this.user.workoutTemplates[this.selectedTemplate].sets[setPlace].exercises;
    const length = exercises.length;

    let found = false;
    for (let i = 0; i < this.user.workoutTemplates[this.selectedTemplate].sets[setPlace].exercises.length; i++) {

      if (found) {
        exercises[i].place = exercises[i - 1].place + 1;

      } else {
        if (exercises[i].place === exercisePlace) {
          found = true;

          if (i < length - 1) {
            exercises[i + 1].place = exercises[i].place;
          }

          exercises.splice(i, 1);
        }
      }
    }
  }

  editExercise(setPlace: number, exercisePlace: number, name: string, kg: number) {
    this.user.workoutTemplates[this.selectedTemplate].sets[setPlace].exercises[exercisePlace].name = name;
    this.user.workoutTemplates[this.selectedTemplate].sets[setPlace].exercises[exercisePlace].kg = kg;
  }

  addReps(setPlace: number, exercisePlace: number) {
    const length = this.user.workoutTemplates[this.selectedTemplate].sets[setPlace].exercises[exercisePlace].reps.length;

    if (length > 3) {
      throw new Error('Cannot add more than 4 sets of reps!');
    }

    this.user.workoutTemplates[this.selectedTemplate].sets[setPlace].exercises[exercisePlace].reps.push({
      repId: 0,
      place: (length > 0) ? length : 0,
      value: 0
    });
  }

  deleteReps(setPlace: number, exercisePlace: number, repsPlace: number) {
    const reps = this.user.workoutTemplates[this.selectedTemplate].sets[setPlace].exercises[exercisePlace].reps;
    const length = reps.length;

    let found = false;
    for (let i = 0; i < this.user.workoutTemplates[this.selectedTemplate].sets[setPlace].exercises[exercisePlace].reps.length; i++) {

      if (found) {
        reps[i].place = reps[i - 1].place + 1;

      } else {
        if (reps[i].place === repsPlace) {
          found = true;

          if (i < length - 1) {
            reps[i + 1].place = reps[i].place;
          }

          reps.splice(i, 1);
        }
      }
    }
  }

  incrementRepsNmber(setPlace: number, exercisePlace: number, repsPlace: number, increment: number) {
    this.user.workoutTemplates[this.selectedTemplate]
      .sets[setPlace]
      .exercises[exercisePlace]
      .reps[repsPlace]
      .value += increment;
  }

  dateToString(date: Date): string {

    let day: string;
    if (date.getDate() < 10) {
      day = '0' + String(date.getDate());
    } else {
      day = String(date.getDate());
    }

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];

    return day + ', ' + months[date.getMonth()] + ', ' + String(date.getFullYear());
  }

  /**
   * Set the user that is saved in the database, so that it can be
   * compared to later when determining if any changes to the user
   * objects have been made.
   */
  setSavedUser() {
    this.user_saved = JSON.parse(JSON.stringify(this.user));
  }

  /**
   * If templates have changed from the templates that are were
   * loaded from the database, then return true to indicate that
   * it's ok to save tamplates, otherwide if no changes were
   * made there's no reason to overwrite the same data.
   */
  canSaveTemplates(): boolean {

    if (this.user.workoutTemplates.length !== this.user_saved.workoutTemplates.length) {
      return false;

    } else {

      for (let i = 0; i < this.user.workoutTemplates.length; i++) {
        if (
          this.user.workoutTemplates[i].name !== this.user_saved.workoutTemplates[i].name ||
          this.user.workoutTemplates[i].place !== this.user_saved.workoutTemplates[i].place
        ) {
          return false;
        } else {

          if (this.user.workoutTemplates[i].sets.length !== this.user_saved.workoutTemplates[i].sets.length) {
            return false;
          } else {

            for (let j = 0; j < this.user.workoutTemplates[i].sets.length; j++) {

              if (
                this.user.workoutTemplates[i].sets[j].exercises.length !==
                this.user_saved.workoutTemplates[i].sets[j].exercises.length
              ) {
                return false;
              } else {

                for (let k = 0; k < this.user.workoutTemplates[i].sets[j].exercises.length; k++) {
                  if (
                    this.user.workoutTemplates[i].sets[j].exercises[k].name !==
                    this.user_saved.workoutTemplates[i].sets[j].exercises[k].name ||
                    this.user.workoutTemplates[i].sets[j].exercises[k].kg !==
                    this.user_saved.workoutTemplates[i].sets[j].exercises[k].kg ||
                    this.user.workoutTemplates[i].sets[j].exercises[k].place !==
                    this.user_saved.workoutTemplates[i].sets[j].exercises[k].place
                  ) {
                    return false;
                  } else {

                    if (
                      this.user.workoutTemplates[i].sets[j].exercises[k].reps.length !==
                      this.user_saved.workoutTemplates[i].sets[j].exercises[k].reps.length
                    ) {
                      return false;
                    } else {

                      for (let m = 0; m < this.user.workoutTemplates[i].sets[j].exercises[k].reps.length; m++) {
                        if (
                          this.user.workoutTemplates[i].sets[j].exercises[k].reps[m].place !==
                          this.user_saved.workoutTemplates[i].sets[j].exercises[k].reps[m].place ||
                          this.user.workoutTemplates[i].sets[j].exercises[k].reps[m].value !==
                          this.user_saved.workoutTemplates[i].sets[j].exercises[k].reps[m].value
                        ) {
                          return false;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return true;
  }

  hasWorkoutChanged(): boolean {
    if (!this.workout_saved) {
      return true;
    }

    if (
      this.workout.name !== this.workout_saved.name ||
      this.workout.workoutSets.length !== this.workout_saved.workoutSets.length
    ) {
      return true;

    } else {

        for (let i = 0; i < this.workout.workoutSets.length; i++) {

          if (
            this.workout.workoutSets[i].place !== this.workout_saved.workoutSets[i].place ||
            this.workout.workoutSets[i].workoutExercises.length !==
              this.workout_saved.workoutSets[i].workoutExercises.length
          ) {
            return true;

        } else {

          for (let j = 0; j < this.workout.workoutSets[i].workoutExercises.length; j++) {
            const ex_1 = this.workout.workoutSets[i].workoutExercises[j];
            const ex_2 = this.workout_saved.workoutSets[i].workoutExercises[j];

            if (
              ex_1.name !== ex_2.name ||
              ex_1.place !== ex_2.place ||
              ex_1.kg !== ex_2.kg ||
              ex_1.workoutReps.length !== ex_2.workoutReps.length
            ) {
              return true;

            } else {

              for (let k = 0; k < ex_1.workoutReps.length; k++) {
                const rep_1 = ex_1.workoutReps[k];
                const rep_2 = ex_2.workoutReps[k];

                if (
                  rep_1.place !== rep_2.place ||
                  rep_1.value !== rep_2.value
                ) {
                  return true;
                }
              }
            }
          }
        }
      }
    }
    return false;
  }

  saveWorkout(): boolean {
    const isNew = this.workout ? false : true;
    const template = this.user.workoutTemplates[this.selectedTemplate];

    if (!this.workout) {
      this.workout = {
        workoutId: isNew ? 0 : this.workout_saved.workoutId,
        identificationOfUser: this.user.userId,
        name: template.name,
        date: new Date(),
        workoutSets: []
      };
    } else {
      this.workout.name = template.name;
      this.workout.workoutSets = [];
    }

    template.sets.forEach(set => {
      this.workout.workoutSets.push({
        workoutSetId: 0,
        place: set.place,
        workoutExercises: []
      });
      set.exercises.forEach(exercise => {
        const set_id = this.workout.workoutSets.length - 1;
        this.workout.workoutSets[set_id].workoutExercises.push({
          workoutExerciseId: 0,
          place: exercise.place,
          name: exercise.name,
          kg: exercise.kg,
          workoutReps: []
        });
        exercise.reps.forEach(rep => {
          const exercise_id = this.workout.workoutSets[set_id].workoutExercises.length - 1;
          this.workout.workoutSets[set_id].workoutExercises[exercise_id].workoutReps.push({
            workoutRepId: 0,
            place: rep.place,
            value: rep.value
          });
        });
      });
    });
    return isNew;
  }

  setSaveWorkout() {
    this.workout_saved = JSON.parse(JSON.stringify(this.workout));
  }

}

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  dateRegistered: Date;
  dateLastLoggedIn: Date;
  workoutTemplates: WorkoutTemplate[];
}

export interface WorkoutTemplate {
  workoutTemplateId: number;
  place: number;
  name: string;
  sets: Set[];
}

export interface Set {
  setId: number;
  place: number;
  exercises: Exercise[];
}

export interface Exercise {
  exerciseId: number;
  place: number;
  name: string;
  kg: number;
  reps: Reps[];
}

export interface Reps {
  repId: number;
  place: number;
  value: number;
}

export interface Workout {
  workoutId: number;
  identificationOfUser: number;
  name: string;
  date: Date;
  workoutSets: WorkoutSet[];
}

export interface WorkoutSet {
  workoutSetId: number;
  place: number;
  workoutExercises: WorkoutExercise[];
}

export interface WorkoutExercise {
  workoutExerciseId: number;
  place: number;
  name: string;
  kg: number;
  workoutReps: WorkoutReps[];
}

export interface WorkoutReps {
  workoutRepId: number;
  place: number;
  value: number;
}

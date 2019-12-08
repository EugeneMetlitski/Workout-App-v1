import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent {

  @ViewChild('firstModalInput') firstModalInput: ElementRef;
  @Input() setPlace: number;
  @Input() exercisePlace: number;
  displayModal = false;

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(30)
    ]),
    kg: new FormControl('', [
      Validators.required,
      Validators.maxLength(10)
    ])
  });

  constructor (private data: DataService) {}

  openModal() {
    this.displayModal = true;

    const exercise = this.data.user
      .workoutTemplates[this.data.selectedTemplate]
      .sets[this.setPlace]
      .exercises[this.exercisePlace];
    this.form.setValue({
      name: exercise.name,
      kg: exercise.kg,
    });

    setTimeout(() => {
      this.firstModalInput.nativeElement.focus();
    }, 10);
  }

  editExercise() {
    this.displayModal = false;

    if (this.form.value.name.length > 0 && !isNaN(this.form.value.kg)) {
      this.data.editExercise(this.setPlace, this.exercisePlace, this.form.value.name, +this.form.value.kg);
    } else {
      console.log(`form filled out incorrectly`);
    }
  }

  deleteExercise() {
    this.data.deleteExercise(this.setPlace, this.exercisePlace);
  }

  addReps() {
    this.data.addReps(this.setPlace, this.exercisePlace);
  }

  deleteReps(place: number) {
    this.data.deleteReps(this.setPlace, this.exercisePlace, place);
  }

  increaseReps(place: number) {
    this.data.incrementRepsNmber(
      this.setPlace,
      this.exercisePlace,
      place, 5
    );
  }

  decreaseReps(place: number) {
    this.data.incrementRepsNmber(
      this.setPlace,
      this.exercisePlace,
      place, -5
    );
  }

}

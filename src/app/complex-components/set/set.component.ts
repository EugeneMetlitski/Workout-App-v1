import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss']
})
export class SetComponent {

  @ViewChild('firstModalInput') firstModalInput: ElementRef;

  @Input() number = 1;
  displayModal = false;

  constructor(private data: DataService) {}

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

  openModal() {
    this.displayModal = true;
    setTimeout(() => {
      this.firstModalInput.nativeElement.focus();
    }, 10);
  }

  addExercise() {
    if (this.form.valid) {
      this.displayModal = false;

      if (!isNaN(this.form.value.kg)) {
        this.data.addNewExercise(this.number - 1, this.form.value.name, +this.form.value.kg);

      } else {
        console.log(`kg field should be a number`);
      }

    } else {
      console.log(`form invalid`);
    }
  }

}

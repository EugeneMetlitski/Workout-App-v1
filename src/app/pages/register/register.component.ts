import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WebService } from 'src/app/services/web.service';
import { DataService, User } from './../../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @ViewChild('confirmPassword') confirmPassword: ElementRef;

  private warning = { msg: '', color: 'red' };
  private btnSubmitDisabled = false;

  constructor(
    private router: Router,
    private webService: WebService,
    private dataService: DataService
  ) {
    this.dataService.title = 'Workout App';
    this.dataService.subtitle = 'Register';
  }

  form = new FormGroup({
    firstName: new FormControl('example', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    lastName: new FormControl('example', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    email: new FormControl('example@email.com', [
      Validators.required,
      Validators.maxLength(50),
      Validators.email
    ]),
    username: new FormControl('example', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    password: new FormControl('example', [
      Validators.required,
      Validators.maxLength(50)
    ])
  });

  submit() {
    if (this.form.valid) {

      // If "Password" and "Confirm Password" did not match
      if (this.confirmPassword.nativeElement.value !== this.form.value.password) {
        this.setWarning('Password and Confirm Password dont match', 'red', true);

      } else {
        // Send new user to the server
        this.webService.register(
          this.form.value,
          (success: boolean, msg?: string, color?: string) => {
            if (success) {
              this.router.navigate(['/workout-app/templates']);
            } else {
              this.setWarning(msg, color, true);
            }
          }
        );

        // Tell user that their data is sent to server
        this.setWarning('Processing...');
        // Make submit button unaccessible
        this.btnSubmitDisabled = true;
      }
    }
  }

  private setWarning(txt: string, color?: string, clear?: boolean) {
    this.warning.color = color ? color : 'grey';
    this.warning.msg = txt;
    if (clear) {
      setTimeout(() => {
        this.warning.msg = '';
        if (this.btnSubmitDisabled) { this.btnSubmitDisabled = false; }
      }, 3000);
    }
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService, User } from './../../services/data.service';
import { WebService } from 'src/app/services/web.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private warning = { msg: '', color: 'red' };
  private btnSubmitDisabled = false;

  constructor(
    private router: Router,
    private webService: WebService,
    private dataService: DataService
  ) {
    this.dataService.title = 'Workout App';
    this.dataService.subtitle = 'Login';
  }

  form = new FormGroup({
    username: new FormControl('example', [
      Validators.required,
      Validators.maxLength(20)
    ]),
    password: new FormControl('example', [
      Validators.required,
      Validators.maxLength(20)
    ])
  });

  submit() {

    if (this.form.valid) {

      // Send new user to the server
      this.webService.login(
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

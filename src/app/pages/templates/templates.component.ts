import { WebService } from 'src/app/services/web.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent {

  @ViewChild('firstModalInput') firstModalInput: ElementRef;
  private feedback = { txt: '', bg: 'green' };

  //#region modal

  renderModal = false;

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(30)
    ])
  });

  openModal() {
    this.renderModal = true;
    setTimeout(() => {
      this.firstModalInput.nativeElement.focus();
    }, 10);
  }

  createNewTemplate(name: string) {
    if (this.form.valid) {
      this.renderModal = false;
      this.data.addNewTemplate(this.form.value.name);
    }
  }

  //#endregion

  constructor(
    private router: Router,
    private webService: WebService,
    private data: DataService,
    private auth: AuthService
  ) {
    this.data.title = 'Templates';
    this.data.subtitle = 'Select a template';
  }

  onDoExerciseClicked(place: number) {
    this.data.selectedTemplate = place;
    this.router.navigate(['/workout-app/workout']);
  }

  saveTemplates() {
    this.provideFeedback('Processing...', 'grey', true);

    this.webService.saveTemplates((msg: string, color: string) => {
      this.provideFeedback(msg, color);
    });
  }

  deleteTemplate(name: string) {
    const conf = confirm('Are you sure you want to delete this template?');
    if (conf) {
      this.data.deleteTemplate(name);
    }
  }

  logout() {
    this.auth.logout();
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

  videwWorkouts() {
    this.router.navigate(['/workout-app/workouts']);
  }

}

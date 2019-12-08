import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { WorkoutComponent } from './pages/workout/workout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ViewWorkoutsComponent } from './pages/view-workouts/view-workouts.component';

const routes: Routes = [
  { path: 'workout-app', redirectTo: 'workout-app/login', pathMatch: 'full' },
  { path: 'workout-app/login', component: LoginComponent },
  { path: 'workout-app/register', component: RegisterComponent },
  { path: 'workout-app/templates', component: TemplatesComponent, canActivate: [AuthGuardService] },
  { path: 'workout-app/workout', component: WorkoutComponent, canActivate: [AuthGuardService] },
  { path: 'workout-app/workouts', component: ViewWorkoutsComponent, canActivate: [AuthGuardService] },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  LoginComponent,
  RegisterComponent,
  TemplatesComponent,
  WorkoutComponent,
  NotFoundComponent,
  ViewWorkoutsComponent
];

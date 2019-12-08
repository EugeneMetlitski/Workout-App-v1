import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetComponent } from './complex-components/set/set.component';
import { ExerciseComponent } from './complex-components/exercise/exercise.component';
import { ModalComponent } from './complex-components/modal/modal.component';

import { WebService } from './services/web.service';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    routingComponents,
    AppComponent,
    SetComponent,
    ExerciseComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
          return localStorage.getItem('token');
        }
      }
    })
  ],
  providers: [
    WebService,
    DataService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

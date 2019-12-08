import { DataService } from 'src/app/services/data.service';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private data: DataService
  ) {}

  private jwtHelper = new JwtHelperService();

  login(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
    this.data.user = undefined;
    this.data.user_saved = undefined;
    this.data.workout = undefined;
    this.data.workout_saved = undefined;
    this.data.selectedTemplate = undefined;
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    // const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    // const isExpired = this.jwtHelper.isTokenExpired(token);

    // console.log(expirationDate);
    // console.log(this.jwtHelper);

    return !this.jwtHelper.isTokenExpired(token);
  }

  getHeaders() {
    return { headers: new HttpHeaders ({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }) };
  }
}

// npm install @auth0/angular-jwt --save
// tutorial: https://www.techiediaries.com/angular-jwt/

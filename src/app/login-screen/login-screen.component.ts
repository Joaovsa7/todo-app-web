import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
})
export class LoginScreenComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginScreen: boolean = true;
  errorMessage: string;
  loading: boolean;

  constructor(private fb: FormBuilder, private userService: UserService, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    const hasToken: string = localStorage.getItem('token');
    if (hasToken) {
      this.router.navigateByUrl('/dashboard');
    }

    this.loginForm = this.fb.group({
      'email': new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(8)
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });

    this.registerForm = this.fb.group({
      'firstName': new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      'lastName': new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      'email': new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(8)
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });

  }

  openSnackBar(message: string, time: number = 3000) {
    this.snackbar.open(message, null, { duration: time });
  }

  changeScreen() {
    this.isLoginScreen = !this.isLoginScreen;
  }

  redirectToDashboard() {
    const dashboardUrl: string = '/dashboard';
    this.router.navigate([dashboardUrl]);
  }

  successCallback = (response: Object) => {
    const hasToken = localStorage.getItem('token');
    if (!hasToken) {
      localStorage.setItem('token', response['token']);
    }
    return this.redirectToDashboard();
  };

  errorCallback = (response: any) => {
    const { error: httpError } = response;
    this.openSnackBar(httpError.error);
    this.loading = false;
  };

  async login() {
    if (this.loginForm.invalid) {
      return false;
    };

    this.loading = true;
    this.userService.doLogin(this.loginForm.value)
      .subscribe(this.successCallback, this.errorCallback,
        () => {
          this.loading = false;
        }
      );
  }

  async register() {
    if (this.registerForm.invalid) {
      return false;
    };
    this.loading = true;
    this.userService.doRegister(this.registerForm.value)
      .subscribe(this.successCallback, this.errorCallback);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
  loginForm: FormGroup;
  hasError: boolean;
  errorMessage: string;
  loading: boolean;
  constructor(private fb: FormBuilder, private userService: UserService) { }


  ngOnInit(): void {
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
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return false;
    };
    this.loading = true;

    this.userService.doLogin(this.loginForm.value)
      .subscribe(
        () => console.log('success'),
        ({ error: responseError }) => {
          const errorMessage = responseError.error;
          this.hasError = true;
          this.errorMessage = errorMessage;
        },
        () => {
          this.loading = false;
        }
      );
  }
}

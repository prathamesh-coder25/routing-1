import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  allreadyHasAccount: boolean = false;
  isLoading: boolean = false;
  hidePassword: boolean = true;
  loginForm !: FormGroup;
  signUpForm !: FormGroup;
  constructor(
    private _authService: AuthService,
    private _snackService: SnackbarService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.createSignUpform();
    this.createLoginform();

    this._authService.fetchPosts()
      .subscribe({
        next: data => {
          console.log(data);
        }
      })
  }

  createSignUpform() {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      userRole: new FormControl('admin'),
    })
  }

  createLoginform() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])

    })
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
    } else {
      this.isLoading = true;
      let details = this.loginForm.value;
      this._authService.login(details)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe({
          next: data => {
            console.log(data);
            this._snackService.openSnackBar(data.message);
            this._authService.saveToken(data.token)
            this._authService.saveUserRole(data.userRole)
            this._router.navigate(['home'])


          },
          error: err => {
            console.log(err);
            this._snackService.openSnackBar(err.error.message)
          }
        })
    }
  }

  onSignUp() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched
    } else {
      let userDetails = this.signUpForm.value;
      this._authService.signUp(userDetails)
        .subscribe({
          next: data => {
            console.log(data);
            this._snackService.openSnackBar(data.message);
            this.allreadyHasAccount = true
          },
          error: err => {
            console.log(err);
            this._snackService.openSnackBar(err.err.message)
          }
        })
    }
  }

}

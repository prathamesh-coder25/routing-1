import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _authService : AuthService,
    private _snackbar : SnackbarService,
    private _router : Router
  ) { }

  ngOnInit(): void {
  }


  onLogOut(){
    this._authService.logOut()
    .subscribe({
      next : res => {
        this._snackbar.openSnackBar(res.msg)
        this._router.navigate([''])

      },
      error : err => {
        this._snackbar.openSnackBar(err)
      }
    })
  }
}

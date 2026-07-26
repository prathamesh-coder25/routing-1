import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iusers } from 'src/app/models/user';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
usersArr !: Array<Iusers>
  constructor(
    private _usersService : UsersService,
     private _router: Router,
    private _snackBar : SnackbarService
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this._usersService.fetchUsers()
    .subscribe({
      next : data => {
        this.usersArr = data;
        if (this.usersArr.length > 0) {
            this._router.navigate([
              '/users',
              this.usersArr[0].userId
            ]);
          }
        },
        error : err => {
          this._snackBar.openSnackBar('err')
        }
    })
  }

}

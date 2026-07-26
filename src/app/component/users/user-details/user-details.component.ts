import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Iusers } from 'src/app/models/user';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsersService } from 'src/app/services/users.service';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userDetails !: Iusers
  userId !: string
  constructor(
    private _routes: ActivatedRoute,
    private _usersService: UsersService,
    private _router: Router,
    private _snackBar: SnackbarService,
    private _matdialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchUserDetails()
  }

  fetchUserDetails() {
  this._routes.paramMap.subscribe(params => {

    this.userId = params.get('userid')!;

    if (this.userId) {
      this._usersService.fetchUserByid(this.userId)
        .subscribe({
          next: data => {
            this.userDetails = data;
          }
        });
    }

  });
}

  onRemove() {
    console.log('Remove clicked');
    let matConfig = new MatDialogConfig();
    matConfig.width = '400px';
    matConfig.disableClose = true;
    matConfig.data = `Are you sure, you want to remove the user with id ${this.userId}`;

    let matRef = this._matdialog.open(GetConfirmComponent, matConfig);

    matRef.afterClosed()
      .subscribe(res => {
        if (res) {
          this._usersService.removeUser(this.userId)
            .subscribe({
              next: res => {

                this._snackBar.openSnackBar(res.msg);

                this._usersService.fetchUsers()
                  .subscribe(users => {

                    if (users.length > 0) {
                      this._router.navigate(['/users', users[0].userId]);
                    } else {
                      this._router.navigate(['/users']);
                    }

                  });

              },

              error: err => {
                console.log(err);
                this._snackBar.openSnackBar(err);
              }
            });

        }

      });
  }


}

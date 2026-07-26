import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, CanDeactivate, Router } from '@angular/router';
import { ICanDeactivate } from 'src/app/models/canDeactivate';
import { Iusers } from 'src/app/models/user';
import { FormUtilityService } from 'src/app/services/form-utility.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, ICanDeactivate{
  isInEditMode: boolean = false
  userForm!: FormGroup;
  editUser = {} as Iusers;
  userId !: string;
  

  constructor(
    private _userService: UsersService,
    private _snackbar: SnackbarService,
    private _router: Router,
    private _routes: ActivatedRoute,
    private _formutility: FormUtilityService
  ) { }

  ngOnInit(): void {
    this.createUserForm()
    this.addSkillControl()
    this.permanentAddHandler()
    this.isAddSameHandler()
    this.patchUserDetails()
  
  }


  patchUserDetails() {
    this.userId = this._routes.snapshot.paramMap.get('userid')!
    if (this.userId) {
      this.isInEditMode = true
      this._userService.fetchUserByid(this.userId)
        .subscribe({
          next: res => {
            this.editUser = res;
            this.userForm.patchValue({ ...this.editUser })
            this._formutility.patchFormArr(res.skills, this.skillArr)
            if (res.userRole === "Candidate") {
              this.userForm.disable()
            } else {
              this.userForm.enable()
            }
            console.log('After disable', this.userForm.get('address.permanent')?.value);

            if (this.formControls['address'].get('current')?.valid) {
              this.formControls['isAddSame'].enable()
                const sameAddress = JSON.stringify(res.address.current) === JSON.stringify(res.address.permanent)

         
          this.formControls['isAddSame'].setValue(sameAddress, { emitEvent: false })

          if (sameAddress) {
            this.formControls['address'].get('permanent')?.disable()
          } else {
            this.formControls['address'].get('permanent')?.enable()
            this.formControls['address'].get('permanent')?.patchValue(res.address.permanent)
          }
        }
      }
      })
  }
}

  patchSkills() {
    this.skillArr.clear()
    this.editUser.skills.forEach(skill => {
      let skillControl = new FormControl(skill, [Validators.required])
      this.skillArr.push(skillControl)
    })
  }

  isAddSameHandler() {
    this.formControls['isAddSame'].valueChanges.subscribe(val => {
      if (val) {
        let currentAdd = this.formControls['address'].get('current')?.value
        this.formControls['address'].get('permanent')?.patchValue(currentAdd)
        this.formControls['address'].get('permanent')?.disable()
      } else {
        const savedPermanent = this.editUser?.address?.permanent
      const hasSavedPermanent = !!savedPermanent &&
        Object.values(savedPermanent).some(v => v !== null && v !== undefined && v !== '')

      if (this.isInEditMode && hasSavedPermanent) {
        this.formControls['address'].get('permanent')?.patchValue(savedPermanent)
      } else {
        this.formControls['address'].get('permanent')?.reset()
      }
      this.formControls['address'].get('permanent')?.enable()
    }
  })
}


  permanentAddHandler() {
    this.formControls['address'].get('current')?.valueChanges.subscribe(val => {
      if (this.formControls['address'].get('current')?.valid) {
        this.formControls['isAddSame'].enable()
      } else {
        this.formControls['isAddSame'].reset()
        this.formControls['isAddSame'].disable()
      }
    })
  }

  createUserForm() {
    this.userForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      userRole: new FormControl('Candidate'),
      profileDescription: new FormControl(null, [Validators.required]),
      profileImage: new FormControl(null, [Validators.required]),
      experienceYears: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null, [Validators.required]),
      isAddSame: new FormControl({ value: null, disabled: true }),
      address: new FormGroup({
        current: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl('India'),
          zipcode: new FormControl(null, [Validators.required])
        }),
        permanent: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl('India'),
          zipcode: new FormControl(null, [Validators.required])
        })
      }),
      skills: new FormArray([])

    })

  }

  addSkillControl() {
    if (this.formControls['skills'].valid ) {
      let skillControl = new FormControl(null, [Validators.required])
      this.skillArr.push(skillControl)
    }
  }

  onRemoveSkill(index: number) {
    if (this.skillArr.length > 1) {
      this.skillArr.removeAt(index);
    } else {
      this.skillArr.markAsTouched();
    }
  }

  get formControls() {
    return this.userForm.controls
  }

  get skillArr() {
    return this.formControls['skills'] as FormArray
  }

  onUserAdd() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched()
    } else {
      let userDetails: Iusers = { ...this.userForm.getRawValue(), userId: Date.now().toString() }
      this._userService.addUser(userDetails)
        .subscribe({
          next: res => {
            this._snackbar.openSnackBar(res.msg);
            this.userForm.markAsPristine()
            this._router.navigate(['/users', res.data.userId])
          },
          error: err => {
            this._snackbar.openSnackBar(err);

          }
        })
    }
  }

  onUserUpdate() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched()
    } else {
      let UPDATED_USER: Iusers = { ... this.userForm.getRawValue(), userId: this.editUser.userId }
      this._userService.updateUser(UPDATED_USER)
        .subscribe({
          next: res => {
            this._snackbar.openSnackBar(res.msg)
            this.userForm.markAsPristine()
            this._router.navigate(['/users', res.data.userId])
          },
          error: err => {
            this._snackbar.openSnackBar(err)
          }
        })
    }
  }

  canDeactivate() {
      if(this.userForm.dirty && this.isInEditMode){
        let getConfirmation = confirm(`Are you sure, you want to discard the changes ?`)
        return getConfirmation
      }
      return true
    }
    

}


  
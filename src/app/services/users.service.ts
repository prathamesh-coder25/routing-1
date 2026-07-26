import { Injectable } from '@angular/core';
import { Iusers } from '../models/user';
import { Observable, of } from 'rxjs';
import { Iproduct, Ires } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
usersArr: Array<Iusers> = [
    {
      userName: 'Shivam Patil',
      userId: 'EMP133',
      userRole: 'Candidate',
      profileDescription: '3 years of experience in Angular development.',
      profileImage: 'data:image/png;base64,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',
      skills: ['Angular', 'TypeScript', 'Bootstrap', 'NodeJs'],
      experienceYears: '3 to 5 years',
      isActive: false,
      address: {
        current: {
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '400001'
        },
        permanent: {
          city: 'Raigad',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '410203'
        }
      },
      isAddSame: false
    },
    {
      userName: 'Drishyam Kadam',
      userId: 'EMP111',
      userRole: 'Admin',
      profileDescription: 'Experienced in Angular and responsive UI development.',
      profileImage: 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTEyL3Jhd3BpeGVsb2ZmaWNlMTBfYWR1bHRfaW5kaWFuX2xhdWdoaW5nX2FuZF9oYXZpbmdfZnVuX2luZGlhbl9idV8yNTNkNzMyYy03M2FiLTRlMDEtYTkwYy0zYjE1MGE2OTEzNWVfMS5wbmc.png',
      skills: ['Angular', 'HTML', 'CSS', 'JavaScript'],
      experienceYears: '3 to 5 years',
      isActive: true,
      address: {
        current: {
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '400009'
        },
       permanent: {
          city: 'Raigad',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '410203'
        }
      },
      isAddSame: true
    }
  ];
  constructor() { }

  fetchUsers() : Observable<Array<Iusers>> {
    return of(this.usersArr)
  }

  fetchUserByid(id:string) : Observable<Iusers> {
    let userObj = this.usersArr.find(u => u.userId === id)!
    return of(userObj)

  }

  addUser(user : Iusers) : Observable<Ires<Iusers>>{
    this.usersArr.unshift(user)
    return of ({
      msg : `The user with id ${user.userId} is added successfully !!!`,
      data : user
    })
  }

  updateUser(user : Iusers){
    let getIndex = this.usersArr.findIndex(u => u.userId===user.userId)
    this.usersArr[getIndex] = user;
    return of({
      msg :`The user with ${user.userId} is updated successfully!!!`,
      data : user
    })
  }

  removeUser(id:string): Observable<Ires<Iusers>>{
    let getIndex = this.usersArr.findIndex(u=> u.userId === id)
    let user = this.usersArr.splice(getIndex, 1)
    return of ({
      msg : `The user with id ${user[0].userId} is removed successfully !!!`,
      data : user[0]
    })

  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private userSubject = new BehaviorSubject<User>({});
  private allUsersSubject = new BehaviorSubject<User[]>([]);
  private userCanEditSubject = new BehaviorSubject<boolean>(false);

  user$ = this.userSubject.asObservable();
  allUsers$ = this.allUsersSubject.asObservable();
  userCanEdit$ = this.userCanEditSubject.asObservable();

  updateUserData(data: User) {
    this.userSubject.next(data);
    if (
      data.isAdmin ||
      (data.role?.includes('customer-service') &&
        data.role?.includes('operations'))
    ) {
      this.userCanEditSubject.next(true);
    } else {
      this.userCanEditSubject.next(false);
    }
  }

  updateAllUsersData(data: User[]) {
    this.allUsersSubject.next(data);
  }

  getUserData() {
    return this.user$;
  }

  getAllUsersData() {
    return this.allUsers$;
  }

  getUserCanEditStatus() {
    return this.userCanEdit$;
  }
}

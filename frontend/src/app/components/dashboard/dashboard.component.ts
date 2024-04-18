import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { User } from '../../../types';
import { Router } from '@angular/router';
import { NotifyService } from '../../services/notify.service';
import { UserTableComponent } from '../user-table/user-table.component';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormPopupComponent } from '../form-popup/form-popup.component';
import { UsersService } from '../../services/users.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [UserTableComponent, ButtonModule, CommonModule, FormPopupComponent],
  providers: [ConfirmationService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private dataService: DataService,
    private notifications: NotifyService,
    private router: Router
  ) {}

  userData: User = {};
  allUsers: User[] = [];
  loading: boolean = false;
  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  selectedUser: User = {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: [],
    isAdmin: false,
  };

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  toggleEditPopup(selectedUser: User) {
    this.selectedUser = selectedUser;
    this.displayEditPopup = true;
  }

  ngOnInit() {
    this.validateToken();
    this.dataService
      .getUserData()
      .subscribe((value) => (this.userData = value));
    this.dataService.getAllUsersData().subscribe((value) => {
      this.allUsers = value;
    });
  }

  validateToken() {
    this.authService.validateToken('/api/auth/validate-token').subscribe({
      next: (data) => {
        if (!data.userId || data.user.logCount === 0) {
          this.router.navigate(['/auth/login']);
        }
        this.dataService.updateUserData(data.user);
      },
      error: () => {
        this.router.navigate(['/auth/login']);
      },
    });
  }
  logOutUser() {
    this.authService.logout('/api/auth/logout').subscribe({
      next: (data) => {
        this.notifications.notifySuccess(data.message);
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.notifications.notifySuccess(error.error.message);
      },
    });
  }

  toggleDisplay(value: boolean) {
    this.displayAddPopup = value;
  }

  toggleEditDisplay(value: boolean) {
    this.displayEditPopup = value;
  }

  onConfirmEdit(user: User) {
    if (this.selectedUser._id === '') {
      return;
    }

    this.editUser(user, this.selectedUser._id);
    this.displayEditPopup = false;
  }

  onConfirmAdd(user: User) {
    this.createUser(user);
    this.displayAddPopup = false;
  }

  editUser(user: User, id: string | undefined) {
    this.loading = true;
    this.userService.updateUser(`/api/user/update/${id}`, user).subscribe({
      next: (data) => {
        this.loading = false;
        this.notifications.notifySuccess(data.message);
        this.getUsers();
      },
      error: (error) => {
        this.loading = false;
        this.notifications.notifyError(error.error.message);
      },
    });
  }

  createUser(user: User) {
    this.loading = true;
    this.userService.createUser('/api/user/create', user).subscribe({
      next: (data) => {
        this.loading = false;
        this.notifications.notifySuccess(data.message);

        this.getUsers();
      },
      error: (error) => {
        this.loading = false;
        this.notifications.notifyError(error.error.message);
      },
    });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(`/api/user/delete/${user._id}`).subscribe({
      next: (data) => {
        this.notifications.notifySuccess(data.message);
        this.getUsers();
      },
      error: (error) => {
        this.notifications.notifyError(error.error.message);
      },
    });
  }

  getUsers() {
    this.userService.getUsers(`/api/user/users`).subscribe({
      next: (data: User[]) => {
        this.dataService.updateAllUsersData(data);
      },
      error: (error) => {
        this.notifications.notifyError(error.error.message);
      },
    });
  }
}

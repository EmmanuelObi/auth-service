import {
  Component,
  Input,
  Output,
  OnInit,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { UsersService } from '../../services/users.service';
import { DataService } from '../../services/data.service';
import { User } from '../../../types';
import { NotifyService } from '../../services/notify.service';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    TagModule,
    ButtonModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private dataService: DataService,
    private notifications: NotifyService,
    private confirmationService: ConfirmationService
  ) {}

  // @ViewChild('deleteIcon') deleteButton: any;

  @Output() edit: EventEmitter<User> = new EventEmitter<User>();
  @Output() delete: EventEmitter<User> = new EventEmitter<User>();

  activeUser: User = {};

  isAbleToEdit: boolean = false;

  users: User[] = [];
  cols!: Column[];

  ngOnInit() {
    this.getUsers();
    this.dataService
      .getAllUsersData()
      .subscribe((value) => (this.users = value));

    this.dataService
      .getUserData()
      .subscribe((value) => (this.activeUser = value));
    this.dataService
      .getUserCanEditStatus()
      .subscribe((value) => (this.isAbleToEdit = value));

    this.cols = [
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'email', header: 'Email' },
      { field: 'role', header: 'User Roles' },
      { field: 'actions', header: 'Actions' },
    ];
  }

  confirmDelete(user: User) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${user.firstName}?`,
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'ml-3',
      accept: () => {
        this.deleteUser(user);
      },
    });
  }

  editUser(user: User) {
    this.edit.emit(user);
  }

  deleteUser(user: User) {
    this.delete.emit(user);
  }

  getUsers() {
    this.userService.getUsers('/api/user/users').subscribe({
      next: (data: User[]) => {
        this.dataService.updateAllUsersData(data);
        this.notifications.notifySuccess('Fetched Users');
      },
      error: (error) => {
        this.notifications.notifyError(error.error.message);
      },
    });
  }

  getColorCode(role: string) {
    switch (role) {
      case 'operations':
        return 'success';
      case 'customer-service':
        return 'warning';
      case 'admin':
        return 'danger';
      default:
        return 'success';
    }
  }
}

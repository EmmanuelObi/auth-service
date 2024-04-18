import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { User } from '../../../types';
import { UsersService } from '../../services/users.service';
import { DataService } from '../../services/data.service';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-form-popup',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    CommonModule,
    MultiSelectModule,
  ],
  templateUrl: './form-popup.component.html',
  styleUrl: './form-popup.component.css',
})
export class FormPopupComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private dataService: DataService,
    private notifications: NotifyService
  ) {}
  @Input() header!: string;
  @Input() display: boolean = false;
  @Input() loading: boolean = false;

  @Output()
  displayChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<any>();

  roles: string[] = ['operations', 'customer-service'];

  @Input() user: User = {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: [],
    isAdmin: false,
  };

  userForm: any = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    isAdmin: [null],
    role: [[]],
  });

  ngOnChanges() {
    this.userForm.patchValue(this.user);
  }

  onCancel() {
    this.display = false;

    this.displayChange.emit(this.display);
  }

  onConfirm() {
    const { firstName, lastName, email, isAdmin, role } = this.userForm.value;

    let data = {
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
      role: role || [],
      isAdmin: isAdmin[0] ?? false,
    };

    this.confirm.emit(data);
    this.display = false;
    this.displayChange.emit(this.display);
  }

  getUsers() {
    this.userService.getUsers('/api/user/users').subscribe({
      next: (data: User[]) => {
        this.dataService.updateAllUsersData(data);
      },
      error: (error) => {
        this.notifications.notifyError(error.error.message);
      },
    });
  }
}

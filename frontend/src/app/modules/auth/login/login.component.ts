import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../../types';
import { AuthService } from '../../../services/auth.service';
import { NotifyService } from '../../../services/notify.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notifications: NotifyService,
    private router: Router,
    private dataService: DataService
  ) {}

  formLoading: boolean = false;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onClickSignIn() {
    const { email, password } = this.loginForm.value;
    this.signIn({
      email: email || '',
      password: password || '',
    });
  }

  signIn(credentials: User) {
    this.formLoading = true;
    this.authService.login('/api/auth/login', credentials).subscribe({
      next: (data) => {
        this.formLoading = false;
        if (data.user.logCount === 0) {
          this.router.navigate(['/auth/reset-password']);
        } else {
          this.router.navigate(['/dashboard']);
        }
        this.dataService.updateUserData(data.user);
        this.notifications.notifySuccess(data.message);
      },
      error: (error) => {
        this.formLoading = false;
        this.notifications.notifyError(error.error.message);
      },
    });
  }
}

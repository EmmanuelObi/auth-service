import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { NotifyService } from '../../../services/notify.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  constructor(
    private userService: UsersService,
    private notifications: NotifyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  formLoading: boolean = false;

  forgotForm = this.formBuilder.group({
    email: ['', Validators.required],
  });

  onClickReset() {
    const { email } = this.forgotForm.value;

    this.onReset({ email: email || '' });
  }

  onReset(credentials: User) {
    this.formLoading = true;
    this.userService
      .forgotPassword('/api/auth/forgot-password', credentials)
      .subscribe({
        next: () => {
          this.router.navigate([`/auth/check-email/${credentials.email}`]);
          this.notifications.notifySuccess(
            'Password reset link sent to your email.'
          );
          this.formLoading = false;
        },
        error: (error) => {
          console.log(error);
          this.notifications.notifyError(error.error.message);
          this.formLoading = false;
        },
      });
  }
}

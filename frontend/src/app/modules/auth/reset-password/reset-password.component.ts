import { Component } from '@angular/core';
import { FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../../../../types';
import { NotifyService } from '../../../services/notify.service';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private notifications: NotifyService,
    private router: Router
  ) {}
  formLoading: boolean = false;

  resetForm = this.formBuilder.group({
    password: ['', Validators.required],
    confirmpassword: ['', Validators.required],
  });

  onClickReset() {
    const { password, confirmpassword } = this.resetForm.value;

    if (password === confirmpassword) {
      this.reset({ password: password || '' });
    } else {
      this.notifications.notifyError('Passwords do not match!');
    }
  }

  reset(credentials: User) {
    this.formLoading = true;

    this.userService
      .resetPassword('/api/user/reset-password', credentials)
      .subscribe({
        next: (data) => {
          this.formLoading = false;
          this.router.navigate(['/auth/password-reset-success']);
          this.notifications.notifySuccess(data.message);
        },
        error: (error) => {
          this.formLoading = false;
          this.notifications.notifyError(error.error.message);
        },
      });
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BaseComponent } from './base/base.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetSuccessComponent } from './password-reset-success/password-reset-success.component';
import { CheckEmailComponent } from './check-email/check-email.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    BaseComponent,
    ForgotPasswordComponent,
    PasswordResetSuccessComponent,
    CheckEmailComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, ToastModule],
  providers: [ConfirmationService],
})
export class AuthModule {}

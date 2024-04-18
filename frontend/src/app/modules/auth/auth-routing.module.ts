import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BaseComponent } from './base/base.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetSuccessComponent } from './password-reset-success/password-reset-success.component';
import { CheckEmailComponent } from './check-email/check-email.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'check-email/:mail',
        component: CheckEmailComponent,
      },
      {
        path: 'password-reset-success',
        component: PasswordResetSuccessComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

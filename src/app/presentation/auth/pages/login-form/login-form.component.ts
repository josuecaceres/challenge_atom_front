import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FontsModules, PrimeModules } from '@shared';
import { AuthService, DataService } from '@services';
import { LoginResponse } from '@interfaces';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FaIconComponent,
    FontsModules,
    PrimeModules,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export default class LoginFormComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private dataService = inject(DataService);

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (data: LoginResponse) => {
        this.dataService.showMessage('success', 'Exito', data.message);
        this.authService.setToken(data.backData?.token!);

        this.dataService.goTo('/dashboard');
      },
      error: ({ error }) => {
        this.dataService.showMessage('error', 'Error', error.message);
      },
    });
  }
}

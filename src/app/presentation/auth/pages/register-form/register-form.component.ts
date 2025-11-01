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
import { AuthService, DataService, ValidatorsService } from '@services';
import { RegisterResponse } from '@interfaces';

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
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export default class RegisterFormComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private dataService = inject(DataService);
  private validatorsService = inject(ValidatorsService);

  public registerForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [
        this.validatorsService.isEqualsPassword('password', 'confirmPassword'),
      ],
    }
  );

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.dataService.showMessage(
        'warn',
        'Exito',
        'Debe completar correctamente los campos solicitados'
      );
      return;
    }

    const { name, email, password } = this.registerForm.value;

    this.authService.register(name, email, password).subscribe({
      next: (data: RegisterResponse) => {
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

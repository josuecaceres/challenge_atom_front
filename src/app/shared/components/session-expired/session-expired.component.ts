import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LoginResponse } from '@interfaces';
import { AuthService, DataService } from '@services';
import { FontsModules, PrimeModules } from '@shared';

@Component({
  selector: 'app-session-expired',
  standalone: true,
  imports: [ReactiveFormsModule, FaIconComponent, FontsModules, PrimeModules],
  templateUrl: './session-expired.component.html',
  styleUrl: './session-expired.component.scss',
})
export class SessionExpiredComponent {
  private fb = inject(FormBuilder);
  authServ = inject(AuthService);
  dataServ = inject(DataService);

  public loginForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    const email = this.authServ.currentUser()!.email;
    const { password } = this.loginForm.value;

    this.authServ.login(email, password).subscribe({
      next: (data: LoginResponse) => {
        this.dataServ.showMessage('success', 'Exito', data.message);
        this.authServ.setToken(data.backData?.token!);
        window.location.reload();
      },
      error: ({ error }) => {
        this.dataServ.showMessage('error', 'Error', error.message);
      },
    });
  }

  logout(event: Event): void {
    this.dataServ
      .showConfirm(event, '¿Está seguro de cerrar sesión?')
      .subscribe((result) => {
        if (result) {
          this.dataServ.goTo('/auth/login');
          this.authServ.logout();
        }
      });
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { AuthService, DataService } from '@services';
import { FontsModules, PrimeModules, SessionExpiredComponent } from '@shared';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterModule,
    RouterOutlet,
    FontsModules,
    PrimeModules,
    SessionExpiredComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export default class DashboardComponent implements OnInit {
  private router = inject(Router);
  public authServ = inject(AuthService);
  public dataServ = inject(DataService);
  public theme = signal<string>('');

  ngOnInit() {
    this.theme.set(this.dataServ.getTheme());
    console.log(this.theme);
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  onUserInfoClick() {
    this.dataServ.sidebarVisible.set(true);
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

  changeTheme() {
    let newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.dataServ.switchTheme(newTheme);
    this.theme.set(newTheme);
  }
}

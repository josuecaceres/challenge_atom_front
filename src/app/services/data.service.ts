import { Inject, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class DataService {
  private router = inject(Router);
  private msgService = inject(MessageService);
  private confService = inject(ConfirmationService);

  localTheme = signal<string>('light');
  sidebarVisible = signal<boolean>(false);

  blockNavigation = signal<boolean>(false);

  constructor(@Inject(DOCUMENT) private document: Document) {}

  getTheme(): string {
    return this.localTheme();
  }

  switchTheme(theme: string) {
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      theme === 'dark'
        ? (themeLink.href = 'aura-dark-blue.css')
        : (themeLink.href = 'aura-light-blue.css');
    }

    localStorage.setItem('atomTheme', theme);
  }

  showMessage(severity: string, summary: string, datail: string) {
    this.msgService.add({
      severity: severity,
      summary: summary,
      detail: datail,
    });
  }

  showConfirm(event: Event, message: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.confService.confirm({
        target: event.target as EventTarget,
        header: 'Confirmación',
        message: message,
        acceptLabel: 'Si',
        acceptIcon: 'none',
        rejectIcon: 'none',
        acceptButtonStyleClass: 'p-button-text',
        rejectButtonStyleClass: 'p-button-text',
        dismissableMask: true,
        accept: () => {
          observer.next(true);
          observer.complete();
        },
        reject: () => {
          observer.next(false);
          observer.complete();
        },
      });
    });
  }

  goTo(path: string, parametro?: string) {
    if (parametro) {
      this.router.navigate([`${path}/${parametro}`]);
    } else {
      this.router.navigate([`${path}`]);
    }
  }

  getYear(): number {
    let now = new Date();
    return now.getFullYear();
  }

  allowExit() {
    this.blockNavigation.set(false);
  }

  blockExit() {
    this.blockNavigation.set(true);
  }

  getBlockNavigation(): boolean {
    return this.blockNavigation();
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

import { PrimeModules, SpinnerComponent } from '@shared';
import { DataService } from '@services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PrimeModules, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private primengConfig = inject(PrimeNGConfig);
  private dataServ = inject(DataService);

  isDarkMode: boolean = false;

  constructor() {
    const savedTheme = localStorage.getItem('atomTheme') || 'light';
    this.dataServ.localTheme.set(savedTheme);

    savedTheme === 'dark'
      ? this.dataServ.switchTheme('dark')
      : this.dataServ.switchTheme('light');
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}

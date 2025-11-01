import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from '@services';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export default class AuthComponent {
  dataServ = inject(DataService);
}

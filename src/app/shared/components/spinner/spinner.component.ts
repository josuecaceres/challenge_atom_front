import { Component, inject } from '@angular/core';
import { SpinnerService } from '@services';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  template: `
    @if (isLoading()) {
    <div class="overlay flex align-items-center justify-content-center">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    }
  `,
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  isLoading = inject(SpinnerService).isLoading;
}

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '@services';
import { PrimeModules } from '@shared';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, PrimeModules],
  template: `
    <div
      class="flex flex-column justify-content-center align-items-center px-4"
      style="min-height: calc(100vh - 62px);"
    >
      <div
        class="flex flex-column justify-content-center align-items-center text-center"
      >
        <img
          src="images/asset-404.svg"
          alt="asset-404"
          style="margin-bottom: -150px; width: 332px; height: 271px;"
        />
        <span style="font-size: 140px; line-height: 171px;">404</span>
        <span class="block text-300 text-center font-medium"
          >Página no encontrada</span
        >

        <p-button
          class="mt-4"
          tooltipPosition="bottom"
          severity="primary"
          routerLink="/dashboard/inicio"
        >
          Volver al inicio
        </p-button>
      </div>

      <div class="flex flex-wrap align-items-center mt-8 px-4">
        <h3 class="m-0 text-color-secondary text-300">
          {{ dataServ.getYear() }} Ⓒ Atom - TaksList
        </h3>
      </div>
    </div>
  `,
})
export class NotFoundComponent {
  dataServ = inject(DataService);
}

import { NgModule } from '@angular/core';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faPenToSquare,
  faPlus,
  faSignOut,
  faTrash,
  faSun,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';

const Icons = [faPenToSquare, faPlus, faSignOut, faTrash, faSun, faMoon];

@NgModule({})
export class FontsModules {
  constructor(library: FaIconLibrary) {
    library.addIcons(...Icons);
  }
}

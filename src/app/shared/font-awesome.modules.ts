import { NgModule } from '@angular/core';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faLock,
  faPenToSquare,
  faPlus,
  faSignOut,
  faTrash,
  faSun,
  faMoon,
  faEnvelope,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const Icons = [
  faLock,
  faPenToSquare,
  faPlus,
  faSignOut,
  faTrash,
  faSun,
  faMoon,
  faEnvelope,
  faUser,
];

@NgModule({})
export class FontsModules {
  constructor(library: FaIconLibrary) {
    library.addIcons(...Icons);
  }
}

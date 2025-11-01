import { NgModule } from '@angular/core';

import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { StepperModule } from 'primeng/stepper';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

const primeModules = [
  AccordionModule,
  AutoCompleteModule,
  AvatarModule,
  ButtonModule,
  CardModule,
  CheckboxModule,
  ConfirmDialogModule,
  DialogModule,
  DividerModule,
  DropdownModule,
  IconFieldModule,
  InputIconModule,
  InputMaskModule,
  InputNumberModule,
  InputTextareaModule,
  InputTextModule,
  MultiSelectModule,
  OverlayPanelModule,
  PaginatorModule,
  PanelModule,
  PasswordModule,
  RippleModule,
  SelectButtonModule,
  SidebarModule,
  StepperModule,
  TableModule,
  TabViewModule,
  TagModule,
  ToastModule,
  ToolbarModule,
  TooltipModule,
];

@NgModule({
  imports: [...primeModules],
  exports: [...primeModules],
})
export class PrimeModules {}

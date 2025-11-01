import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { GetTaksResponse } from '@interfaces';
import { DataService, TasksService, ValidatorsService } from '@services';
import { FontsModules, PrimeModules } from '@shared';
import { map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrl: 'home.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FaIconComponent,
    PrimeModules,
    FontsModules,
  ],
})
export default class NameComponent implements OnInit {
  private fb = inject(FormBuilder);
  dataServ = inject(DataService);
  taksServ = inject(TasksService);
  validatorServ = inject(ValidatorsService);
  currentRegister: string | null = null;

  tasks = signal<GetTaksResponse['backData']>([]);
  showDialog: boolean = false;

  public taskForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
  });

  ngOnInit() {
    this.getAllTask();
  }

  isValidField(field: string) {
    return this.validatorServ.isValidField(this.taskForm, field);
  }

  getAllTask() {
    const result = this.taksServ.getTaks();
    result.pipe(map((res) => res.backData)).subscribe({
      next: (data) => {
        this.tasks.set(data);
      },
    });
  }

  openDialog(row?: GetTaksResponse['backData'][number]) {
    if (!row) {
      this.showDialog = true;
      return;
    }
    this.showDialog = true;
    this.taskForm.setValue({
      nombre: row.nombre,
    });
    this.currentRegister = row.id;
  }

  saveTask() {
    if (this.taskForm.invalid) return;

    if (this.currentRegister != null) {
      const result = this.taksServ.editTaks(
        {
          nombre: this.taskForm.get('nombre')?.value,
          fecha: new Date(),
        },
        this.currentRegister!
      );
      result.pipe(map((res: any) => res.message)).subscribe({
        next: (data) => {
          this.dataServ.showMessage('success', 'Exito', data);
          this.getAllTask();
          this.closeModal();
        },
      });
    } else {
      const result = this.taksServ.createTaks({
        nombre: this.taskForm.get('nombre')?.value,
        fecha: new Date(),
      });
      result.pipe(map((res: any) => res.message)).subscribe({
        next: (data) => {
          this.dataServ.showMessage('success', 'Exito', data);
          this.getAllTask();
          this.closeModal();
        },
      });
    }
  }

  toggleStatus(task: GetTaksResponse['backData'][number]) {
    this.tasks.update((list) =>
      list.map((t) => (t.id === task.id ? { ...t, estado: !t.estado } : t))
    );

    const result = this.taksServ.changeStatusTaks(task.estado, task.id);
    result.pipe(map((res: any) => res.message)).subscribe({
      next: (data) => {
        this.dataServ.showMessage('success', 'Exito', data);
        this.getAllTask();
        this.closeModal();
      },
    });
  }

  deleteTask(event: any, task: GetTaksResponse['backData'][number]) {
    this.dataServ
      .showConfirm(event, '¿Está seguro de eliminar esta tarea?')
      .subscribe((result) => {
        if (result) {
          const result = this.taksServ.deleteTaks(task.id);
          result.pipe(map((res: any) => res.message)).subscribe({
            next: (data) => {
              this.dataServ.showMessage('success', 'Exito', data);
              this.getAllTask();
              this.closeModal();
            },
          });
        }
      });
  }

  closeModal() {
    this.showDialog = false;
    this.taskForm.reset();
    this.currentRegister = null;
  }
}

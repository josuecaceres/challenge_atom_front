import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { GetTaksResponse } from '@interfaces';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private readonly baseUrl: string = environment.apiUrl;
  private _http = inject(HttpClient);

  constructor() {}

  getTaks(): Observable<GetTaksResponse> {
    return this._http.get<GetTaksResponse>(`${this.baseUrl}/tasks`);
  }

  createTaks(formData: any) {
    return this._http.post(`${this.baseUrl}/tasks`, formData);
  }

  editTaks(formData: any, idTask: string) {
    return this._http.patch(`${this.baseUrl}/tasks/${idTask}`, formData);
  }

  changeStatusTaks(newStatus: boolean, idTask: string) {
    return this._http.patch(`${this.baseUrl}/tasks/${idTask}/status`, {
      estado: newStatus,
    });
  }

  deleteTaks(idTask: string) {
    return this._http.delete(`${this.baseUrl}/tasks/${idTask}`);
  }
}

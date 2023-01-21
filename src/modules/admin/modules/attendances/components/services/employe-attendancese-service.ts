import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FilterEmployeeParams } from 'src/modules/admin/shared/model/filters';
import { Pagination } from 'src/modules/admin/shared/model/pagination';
import { IEmployeeAtendances } from '../../models/employee-atendances';

@Injectable()
export class EmployeeAtendancesService {
  private apiURL = environment.apiURL + 'EmployeeAttendances';
  constructor(private http: HttpClient) {}

  GetAll(
    filters: FilterEmployeeParams | any
  ): Observable<Pagination<IEmployeeAtendances[]>> {
    let params = new HttpParams();
    Object.keys(filters).forEach((elm) => {
      if (
        filters[elm] !== undefined &&
        filters[elm] !== null &&
        filters[elm] !== ''
      ) {
        params = params.append(elm, filters[elm]);
      }
    });
    return this.http.get<Pagination<IEmployeeAtendances[]>>(this.apiURL, {
      params,
    });
  }

  add(item: IEmployeeAtendances): Observable<IEmployeeAtendances> {
    return this.http.post<IEmployeeAtendances>(this.apiURL, item);
  }

  Remove(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiURL + '?id=' + id);
  }

  employeeAttendances(id: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/' + id);
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IEmployee } from '../../models/employee';
import { FilterEmployeeParams } from 'src/modules/admin/shared/model/filters';
import { Pagination } from 'src/modules/admin/shared/model/pagination';

@Injectable()
export class EmployeeService {
  private apiURL = environment.apiURL + 'Employee';
  constructor(private http: HttpClient) {}

  GetAll(
    filters: FilterEmployeeParams | any
  ): Observable<Pagination<IEmployee[]>> {
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
    return this.http.get<Pagination<IEmployee[]>>(this.apiURL, { params });
  }

  add(item: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(this.apiURL, item);
  }

  Remove(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiURL + '?id=' + id);
  }

  getEmployeeLookup():Observable<any>{
    return this.http.get<any>(this.apiURL+"/getlookup");
  }
}

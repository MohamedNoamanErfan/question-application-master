import { Component, Inject } from '@angular/core';
import { EmployeeAtendancesService } from '../services/employe-attendancese-service';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Pagination } from 'src/modules/admin/shared/model/pagination';
import { FilterEmployeeParams } from 'src/modules/admin/shared/model/filters';
import { DeleteDialogComponent } from 'src/modules/admin/component/delete/delete.dialog.component';
import { ToastrService } from 'ngx-toastr';
import { AddEditEmploeeAtendancesDialogComponent } from '../add-edit/add-dialog.component';
import { IEmployeeAtendances } from '../../models/employee-atendances';
import { IEmployee } from '../../../employees/models/employee';
import { EmployeeService } from '../../../employees/components/services/employee-service';
import { ViewEmployeeAttendanceDetailsComponent } from '../view-employee-details/view-dialog.component';
import { distinctUntilChanged, interval, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-list.dialog',
  templateUrl: './list.dialog.component.html',
  styleUrls: ['./list.dialog.component.scss'],
})
export class EmployeeAtendancesListComponent {
  employeeLookup: IEmployee[];
  isLoading: boolean = false;
  dataSource: Pagination<IEmployeeAtendances[]> = new Pagination<
    IEmployeeAtendances[]
  >();
  totalCount?: number = 0;
  filters = new FilterEmployeeParams();
  displayedColumns = ['id', 'EmpName', 'SRVDT', 'DEVDT', 'DEVUID', 'actions'];
  searchKeySubs: Subscription;

  constructor(
    private toastrService: ToastrService,
    private employeeAtendancesService: EmployeeAtendancesService,
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.filters = new FilterEmployeeParams();
    this.getEmployees();
    this.loadData();
  }
  getEmployees() {
    this.employeeService.getEmployeeLookup().subscribe((result) => {
      if (result) this.employeeLookup = result;
    });
  }

  loadData(): void {
    this.isLoading = true;
    this.filters.pageIndex =
      this.filters.pageIndex <= 0 ? 1 : this.filters.pageIndex;

    this.employeeAtendancesService.GetAll({ ...this.filters }).subscribe(
      (result) => {
        result.data.forEach((element) => {
          element.devdtDate = new Date(element.devdt);
          element.devuidDate = new Date(element.devuid);
        });
        this.dataSource.data = result.data;
        this.dataSource.count = result.count;
        this.dataSource.pageIndex = result.pageIndex;
        this.dataSource.pageSize = result.pageSize;
        this.filters.pageIndex = result.pageIndex - 1;
        this.filters.pageSize = result.pageSize;
        this.isLoading = false;
      },
      (err) => {
        this.dataSource.count = 0;
        this.toastrService.error('Message Error!', 'Cannot load data');
        this.isLoading = false;
      }
    );
  }

  //#region CRUD
  addEdit(item?: IEmployeeAtendances) {
    let title = 'Submit your Attendance';
    if (item) {
      title = 'Edit Employee';
    }
    const dialogRef = this.dialog.open(
      AddEditEmploeeAtendancesDialogComponent,
      {
        position: {
          top: '2%',
        },
        data: {
          item: { ...item },
          title: title,
        },
        width: '10000px',
        height: '600px',
      }
    );
    dialogRef.afterClosed().subscribe((result: IEmployeeAtendances) => {
      if (result) {
        console.log(result);
        this.isLoading = true;
        result.devdt = new Date().getTime();
        result.devuid = new Date().getTime();
        result.srvdt = new Date();

        this.employeeAtendancesService.add(result).subscribe(
          (data) => {
            this.filters = new FilterEmployeeParams();
            this.toastrService.success('data save successfully');
            this.loadData();
          },
          (err) => {
            this.isLoading = false;
            this.addEdit(result);
            let erroslst = '';

            this.toastrService.error(err?.error?.errors, err?.error?.message);
          }
        );
      }
    });
  }
  view(empID: number) {
    let title = 'View Attendance';

    const dialogRef = this.dialog.open(ViewEmployeeAttendanceDetailsComponent, {
      position: {
        top: '2%',
      },
      data: {
        item: { empID },
        title: title,
      },
      width: '10000px',
      height: '600px',
    });
    // dialogRef.afterClosed().subscribe((result: IEmployeeAtendances) => {
    //   if (result) {
    //     console.log(result);
    //     this.isLoading = true;
    //     result.devdt = new Date().getTime();
    //     result.devuid = new Date().getTime();
    //     result.srvdt = new Date();

    //     this.employeeAtendancesService.add(result).subscribe(
    //       (data) => {
    //         this.filters = new FilterEmployeeParams();
    //         this.toastrService.success('data save successfully');
    //         this.loadData();
    //       },
    //       (err) => {
    //         this.isLoading = false;
    //         this.addEdit(result);
    //         let erroslst = '';

    //         this.toastrService.error(err?.error?.errors, err?.error?.message);
    //       }
    //     );
    //   }
    // });
  }

  deleteItem(item: any) {
    item.name = item.empolyeeName;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      position: {
        top: '2%',
      },
      data: { ...item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employeeAtendancesService.Remove(item.id).subscribe(
          (data) => {
            this.toastrService.success('Data deleted successfully');
            this.filters = new FilterEmployeeParams();
            this.loadData();
          },
          (err) => {
            this.isLoading = false;
            this.toastrService.error('cannot delete the record');
          }
        );
      }
    });
  }
  //#endregion

  onFilter(key: string): void {
    this.searchKeySubs = interval(1000)
      .pipe(
        map(() => key),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.loadData();
      });
  }

  ngOnDestroy(): void {
    if (this.searchKeySubs) {
      this.searchKeySubs.unsubscribe();
    }
  }

  getAttendanceByEmployeeId(id: number) {
    this.filters.search = id.toString();
    this.loadData();
  }

  onSort(sortEvent: Sort): void {
    this.filters.pageIndex += 1;
    this.filters.sort = sortEvent.direction;
    this.loadData();
  }

  refresh(): void {
    this.filters = new FilterEmployeeParams();
    this.loadData();
  }
  onPage(pageEvent: PageEvent): void {
    this.filters.pageSize = pageEvent.pageSize;
    this.filters.pageIndex = pageEvent.pageIndex + 1;
    this.filters.pageSize = pageEvent.pageSize;
    this.loadData();
  }
}

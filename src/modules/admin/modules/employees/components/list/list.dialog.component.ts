import { Component, Inject } from '@angular/core';
import { IEmployee } from '../../models/employee';
import { EmployeeService } from '../services/employee-service';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddEditEmploeeDialogComponent } from '../add-edit/add-dialog.component';
import { Pagination } from 'src/modules/admin/shared/model/pagination';
import { FilterEmployeeParams } from 'src/modules/admin/shared/model/filters';
import { DeleteDialogComponent } from 'src/modules/admin/component/delete/delete.dialog.component';
import { ToastrService } from 'ngx-toastr';
import { distinctUntilChanged, interval, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-list.dialog',
  templateUrl: './list.dialog.component.html',
  styleUrls: ['./list.dialog.component.scss'],
})
export class EmployeeListComponent {
  isLoading: boolean = false;
  dataSource: Pagination<IEmployee[]> = new Pagination<IEmployee[]>();
  totalCount?: number = 0;
  filters = new FilterEmployeeParams();
  displayedColumns = ['id', 'Name', 'email', 'phone', 'actions'];
  searchKeySubs: Subscription;

  constructor(
    private toastrService: ToastrService,
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.filters = new FilterEmployeeParams();
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.filters.pageIndex =
      this.filters.pageIndex <= 0 ? 1 : this.filters.pageIndex;
    this.employeeService.GetAll({ ...this.filters }).subscribe(
      (result) => {
        this.dataSource.data = result.data;
        this.dataSource.count = result.count;
        this.dataSource.pageIndex = result.pageIndex;
        this.dataSource.pageSize = result.pageSize;
        this.filters.pageIndex = result.pageIndex - 1;
        this.filters.pageSize = result.pageSize;
        this.isLoading = false;
      },
      (err) => {
        this.dataSource.count=0;
        this.toastrService.error('Cannot load the data!', 'System Error!');
        this.isLoading = false;
      }
    );
  }

  //#region CRUD
  addEdit(item?: IEmployee) {
    let title = 'Add new Employee';
    if (item) {
      title = 'Edit Employee';
    }
    const dialogRef = this.dialog.open(AddEditEmploeeDialogComponent, {
      position: {
        top: '2%',
      },
      data: {
        item: { ...item },
        title: title,
      },
      width: '10000px',
      height: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.isLoading = true;
        this.employeeService.add(result).subscribe(
          (data) => {
            this.filters = new FilterEmployeeParams();
            this.toastrService.success('Data saved successfully');
            this.loadData();
          },
          (err) => {
            this.isLoading = false;
            this.addEdit(result);
            this.toastrService.error(err?.error?.errors, err?.error?.message);
          }
        );
      }
    });
  }
  
  deleteItem(item: IEmployee) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      position: {
        top: '2%',
      },
      data: { ...item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employeeService.Remove(item.id).subscribe(
          (data) => {
            this.toastrService.success("Recored deleted successfully");
            this.filters = new FilterEmployeeParams();
            this.loadData();
          },
          (err) => {
            this.isLoading = false;
            this.toastrService.error("cannot delete the record")

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

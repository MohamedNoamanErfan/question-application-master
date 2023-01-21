import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeAtendancesService } from '../services/employe-attendancese-service';

@Component({
  selector: 'app-view-employee-details',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.scss'],
})
export class ViewEmployeeAttendanceDetailsComponent implements OnInit {
  displayedColumns = ['id', 'date', 'first', 'last'];
  dataSource: any;
  isLoading = false;
  data: any;
  constructor(
    private attendanceService: EmployeeAtendancesService,
    @Inject(MAT_DIALOG_DATA) public item: any
  ) {
    this.data = item.item;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.attendanceService.employeeAttendances(this.data.empID).subscribe(
      (result) => {
        if (result) this.dataSource = result;
        this.isLoading = false;
      },
      (err) => {
        this.dataSource.count=0;
        this.isLoading = false
      }
    );
  }
}

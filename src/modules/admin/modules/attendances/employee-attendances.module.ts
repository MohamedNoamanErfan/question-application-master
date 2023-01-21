import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmployeeAttendancesRoutingModule } from './employee-attendances.routing.module';
import { FormsModule } from '@angular/forms';
import { AdminSharedModule } from '../../shared/AdminShared.module';
import { ViewComponent } from './components/view.component';
import { EmployeeAtendancesListComponent } from './components/list/list.dialog.component';
import { AddEditEmploeeAtendancesDialogComponent } from './components/add-edit/add-dialog.component';
import { EmployeeAtendancesService } from './components/services/employe-attendancese-service';
import { EmployeeService } from '../employees/components/services/employee-service';
import { ViewEmployeeAttendanceDetailsComponent } from './components/view-employee-details/view-dialog.component';

const components: any = [
  ViewComponent,
  EmployeeAtendancesListComponent,
  AddEditEmploeeAtendancesDialogComponent,
  ViewEmployeeAttendanceDetailsComponent,
];

@NgModule({
  imports: [
    CommonModule,
    EmployeeAttendancesRoutingModule,
    AdminSharedModule,
    FormsModule,
  ],
  declarations: [...components],
  providers: [EmployeeAtendancesService, EmployeeService],
  entryComponents: [],
})
export class EmployeeAttendancesModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmployeeListComponent } from './components/list/list.dialog.component';
import { ViewComponent } from './components/view.component';
import { EmployeeRoutingModule } from './employee.routing.module';
import { FormsModule } from '@angular/forms';
import { AddEditEmploeeDialogComponent } from './components/add-edit/add-dialog.component';
import { AdminSharedModule } from '../../shared/AdminShared.module';
import { EmployeeService } from './components/services/employee-service';

const components: any = [
  ViewComponent,
  EmployeeListComponent,
  AddEditEmploeeDialogComponent,
];

@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    AdminSharedModule,
    FormsModule,
  ],
  declarations: [...components],
  providers: [EmployeeService],
  entryComponents: [],
})
export class EmployeeModule {}

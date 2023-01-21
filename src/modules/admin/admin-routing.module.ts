import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('src/modules/admin/modules/employees/employee.module').then(
            (m) => m.EmployeeModule
          ),
      },
      {
        path: 'attendances',
        loadChildren: () =>
          import(
            'src/modules/admin/modules/attendances/employee-attendances.module'
          ).then((m) => m.EmployeeAttendancesModule),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

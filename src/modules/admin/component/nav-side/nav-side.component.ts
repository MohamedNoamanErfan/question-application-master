import { Component } from '@angular/core';
import { ROUTE } from 'src/modules/admin/shared/model/Route';


@Component({
  selector: 'app-admin-nav-side',
  templateUrl: './nav-side.component.html',
  styleUrls: ['./nav-side.component.scss']
})
export class NavSideComponent {
  year = new Date().getFullYear();
 
  
  masterRoutes: ROUTE[] = [
    {
      icon: 'folder',
      route: '',
      title: 'Employees'
    },
    {
      icon: 'library_books',
      route: 'attendances',
      title: 'Attendances'
    },
  ];

  constructor(
  ) { }

}


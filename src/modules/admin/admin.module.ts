import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { NavSideComponent } from './component/nav-side/nav-side.component';

const components: any = [AdminComponent, NavSideComponent, NavBarComponent];
@NgModule({
  imports: [CommonModule, HttpClientModule, AdminRoutingModule, SharedModule],
  declarations: [...components],
  providers: [],
})
export class AdminModule {}

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from 'src/modules/shared.module';

const modules = [
  CommonModule,
  HttpClientModule,
  RouterModule,
  SharedModule
];


@NgModule({
  imports: [
    ...modules
  ],
  declarations: [
  ],
  exports: [
    ...modules,
  ]
})
export class AdminSharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: AdminSharedModule,
      providers: [
      ],
    };
  }
}

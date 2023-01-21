import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from "@angular/cdk/layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from "@angular/material/core";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTreeModule } from '@angular/material/tree';
import { MatTabsModule } from '@angular/material/tabs';
import { NotFoundComponent } from "./admin/shared/not-found/not-found.component";
import { LoadingComponent } from "./admin/shared/loading/loading.component";
import { DeleteDialogComponent } from "./admin/component/delete/delete.dialog.component";

const modules: any = [
  CommonModule,
  HttpClientModule,
  RouterModule,
  FormsModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatTableModule,
  MatSelectModule,
  MatSortModule,
  MatInputModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatDialogModule,
  MatTooltipModule,
  MatMenuModule,
  LayoutModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDividerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatTreeModule,
  MatCheckboxModule,
  MatTabsModule
]

const components: any = [
  LoadingComponent,
  NotFoundComponent,
  DeleteDialogComponent
];

@NgModule({
  imports: [
    ...modules,
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components,
    ...modules
  ],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
      ],
    }
  }
}
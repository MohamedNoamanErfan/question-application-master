import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import {  MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"; 
import { EmployeeService } from "../../../employees/components/services/employee-service";
import { IEmployeeAtendances } from "../../models/employee-atendances";

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-book.dialog.component.html',
  styleUrls: ['./add-book.dialog.component.scss']
})

export class AddEditEmploeeAtendancesDialogComponent {
  public item : IEmployeeAtendances;
  public employeeLookup:any;

  formControl = new FormControl('', [
    Validators.required
  ]);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEditEmploeeAtendancesDialogComponent>,
    private employeeService:EmployeeService
    ) { 
      this.item = data.item ? data.item : {} as IEmployeeAtendances;
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployeeLookup().subscribe((result) => {
      if (result) this.employeeLookup = result;
    });
  }
 
  confirmSave(): void {
    
    this.dialogRef.close({ ...this.item });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }


  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required' :
      '';
  }

}
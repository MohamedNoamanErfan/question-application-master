import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import {  MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"; 
import { IEmployee } from "../../models/employee";


@Component({
  selector: 'app-add-dialog',
  templateUrl: './add.dialog.component.html',
  styleUrls: ['./add.dialog.component.scss']
})
export class AddEditEmploeeDialogComponent {
  public item : IEmployee;

  formControl = new FormControl('', [
    Validators.required
  ]);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEditEmploeeDialogComponent>,
    ) { 
      this.item = data.item ? data.item : {} as IEmployee;
  }

  ngOnInit(): void {
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
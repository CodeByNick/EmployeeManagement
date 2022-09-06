import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeApiService } from 'src/app/employee/services/employee-api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  freshnessList = ["Refurbished", "Brand New", "Others"]

  employeeForm !: FormGroup;
  actionBtn : string = "Save";
  constructor(
    private formBuilder: FormBuilder,
    private employeeApi: EmployeeApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dept: ['', Validators.required],
      position: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required]
    });
    
    if(this.editData){
      this.actionBtn = "Update";
      this.employeeForm.controls['firstName'].setValue(this.editData.firstName);
      this.employeeForm.controls['lastName'].setValue(this.editData.lastName);
      this.employeeForm.controls['dept'].setValue(this.editData.dept);
      this.employeeForm.controls['position'].setValue(this.editData.position);
      this.employeeForm.controls['address1'].setValue(this.editData.address1);
      this.employeeForm.controls['address2'].setValue(this.editData.address2);
      this.employeeForm.controls['state'].setValue(this.editData.state);
      this.employeeForm.controls['city'].setValue(this.editData.city);
      this.employeeForm.controls['pincode'].setValue(this.editData.pincode);
    }
  }

  addEmployee() {
    if(!this.editData){
      if (this.employeeForm.valid) {
        this.employeeApi.postEmployee(this.employeeForm.value)
          .subscribe({
            next: (res) => {
              alert('Employee added successfully!');
              this.employeeForm.reset();
              this.dialogRef.close('save');
            },
            error: (error) => {
              alert('Error: ' + error.message);
            }
          });
      }
    }
    else{
      this.updateEmployee();
    }
  }

  updateEmployee(){
    this.employeeApi.putEmployees(this.employeeForm.value, this.editData.id)
    .subscribe({
      next: (res)=>{
        alert("Employee updated successfully!");
        this.employeeForm.reset();
        this.dialogRef.close('update');
      },
      error: (err)=>{
        alert('Error: ' + err.message);
      }
    })
  }
}

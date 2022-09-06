import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { EmployeeApiService } from '../../services/employee-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = ['id','firstName', 'lastName', 'dept', 'position', 'address1', 'address2', 'state', 'city', 'pincode', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private employeeApi: EmployeeApiService) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }
  openDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '30%',
    }).afterClosed().subscribe(value => {
      if (value === 'save') {
        this.getAllEmployees();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllEmployees() {
    this.employeeApi.getEmployees()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        },
        error: (err) => {
          console.log(err);
        }
      })
  }
  editEmployee(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(value => {
      if (value === 'update') {
        this.getAllEmployees();
      }
    })
  }
  deleteEmployee(id : number){
    this.employeeApi.deleteEmployees(id)
    .subscribe({
      next: (res) => {
        alert("Employee deleted successfully!");
        this.getAllEmployees();
      },
      error: (err) => {
        alert('Error: ' + err.message);
      }
    })
  }
}

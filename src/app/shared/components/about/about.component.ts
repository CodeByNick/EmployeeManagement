import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  appName = "Employee Management App";
  creator = "Nikhil Rajiwade";
  description = "This app performs basic CRUD operations on the employee management."
  constructor() { }

  ngOnInit(): void {
  }

}

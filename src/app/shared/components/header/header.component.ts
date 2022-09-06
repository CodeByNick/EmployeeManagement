import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AboutComponent } from '../about/about.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private dialog : MatDialog
  ) { }

  ngOnInit(): void {
  }

  openAboutDialog(){
    this.dialog.open(AboutComponent,{
      width: '30%'
    })
  }
}

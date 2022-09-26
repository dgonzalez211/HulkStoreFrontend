import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-alert',
  templateUrl: './snack-alert.component.html',
  styleUrls: ['./snack-alert.component.css']
})
export class SnackAlertComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }



  ngOnInit(): void {
  }

}

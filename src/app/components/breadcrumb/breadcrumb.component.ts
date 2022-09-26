import { Component, Input, OnInit } from '@angular/core';
import { Bread } from './bread';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input() show = true;
  @Input()bread!: Bread;
  constructor() {
  }

  
  ngOnInit(): void {
  }

}

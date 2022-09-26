import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Customer } from './customer';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer/customer.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements AfterViewInit {

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  bread = {
    title: 'Customers',
    breads: [{
      active: false,
      title: 'Home',
      link: '/home'
    },
    {
      active: true,
      title: 'Customers',
      link: '/home/customer'
    }]
  };

  isLoadingResults = true;
  dataSource: MatTableDataSource<Customer>;
  displayedColumns = ['name', 'lastName','surName','provider'];
  query = '';
  resultsLength = 0;
  pageIndex = 0;
  pageSize = 50;
  direction = 'asc';
  active = 'name';

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: CustomerService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.service.typeHeadSearchPage(this.query, this.paginator.pageIndex,
            this.paginator.pageSize, this.sort.direction, this.sort.active);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.totalElements;
          return data.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }


  search(query: string) {
    this.isLoadingResults = true;
    this.service.typeHeadSearchPage(query, this.paginator.pageIndex,
      this.paginator.pageSize, this.sort.direction, this.sort.active).subscribe(data => {
        this.isLoadingResults = false;
        this.resultsLength = data.totalElements;
        this.dataSource.data = data.content;
      }, error => {
        this.isLoadingResults = false;
        return observableOf([]);
      });
  }
  filterTable(event: any) {
    if (event.code !== 'ArrowUp'
      && event.code !== 'ArrowDown'
      && event.code !== 'ArrowLeft'
      && event.code !== 'ArrowRight'
      && event.code !== 'ControlLeft'
      && event.code !== 'Shift'
      && (typeof this.query === 'string')) {
        this.search(this.query);
    }
  }

  navigateTo(id: number) {
    this.router.navigate(['/home/customer-manager/', id]);
  }

}

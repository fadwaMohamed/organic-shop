import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, switchMap } from 'rxjs';
import { Order } from 'src/app/shared/models/order';

import { AuthService } from './../../../shared/services/auth.service';
import { OrderService } from './../../../shared/services/order.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  orders!: Order[];
  sub!: Subscription;

  // table
  displayedColumns: string[] = ['customer', 'date', 'actions'];
  dataSource!: MatTableDataSource<Order>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private orderSer: OrderService, private auth: AuthService) {}

  ngOnInit() {
    this.sub = this.auth.currentUser$
      .pipe(
        switchMap((user) =>
          this.orderSer.getOrdersByUser(JSON.stringify(user?.uid))
        )
      )
      .subscribe((orders) => {
        this.orders = orders;

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(orders);

        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/models/order';

import { OrderService } from './../../../shared/services/order.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders!: Order[];
  sub!: Subscription;

  // table
  displayedColumns: string[] = ['customer', 'date', 'actions'];
  dataSource!: MatTableDataSource<Order>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private orderSer: OrderService) {}

  ngOnInit() {
    this.sub = this.orderSer.getOrders().subscribe((orders) => {
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

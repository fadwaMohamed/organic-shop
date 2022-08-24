import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css'],
})
export class OrderViewComponent implements OnInit {
  key!: string | null;
  order!: Order | null;

  constructor(private ar: ActivatedRoute, private orderSer: OrderService) {
    let id = this.ar.snapshot.paramMap.get('id');

    // get order
    if (id) {
      this.key = id;
      this.orderSer.getOrderById(this.key).subscribe((o) => (this.order = o));
    }
  }

  ngOnInit() {}
}

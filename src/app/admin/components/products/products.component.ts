import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iproduct } from 'src/app/shared/models/iproduct';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'admin-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products!: Iproduct[];
  sub!: Subscription;

  // table
  displayedColumns: string[] = ['#', 'title', 'price', 'actions'];
  dataSource!: MatTableDataSource<Iproduct>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productSer: ProductService, private router: Router) {}

  ngOnInit() {
    this.sub = this.productSer.getAll().subscribe((products) => {
      this.products = products;

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(products);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.filterTable();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private filterTable() {
    // to filter only by title
    this.dataSource.filterPredicate = ( data: Iproduct, filter: string ): boolean => {
      return data.title.toLocaleLowerCase().includes(filter);
    };
  }

  editProduct(key: string) {
    // open edit page
    this.router.navigate(['admin/products/update', key]);
  }

  addProduct() {
    // open add page
    this.router.navigate(['admin/products/new']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

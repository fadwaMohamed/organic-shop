import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent implements OnInit {
  @Input('category') category!: string;

  categories$: Observable<any>;

  constructor(private categorySer: CategoryService) {
    // categories
    this.categories$ = this.categorySer.getAll();
  }

  ngOnInit(): void {}
}

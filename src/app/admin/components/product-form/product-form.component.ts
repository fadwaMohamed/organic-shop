import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, take } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  key!: string;
  categories$: Observable<any>;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ar: ActivatedRoute,
    private router: Router,
    private productSer: ProductService,
    private categorySer: CategoryService,
    private _snackBar: MatSnackBar,
    private modalService: NgbModal
  ) {
    // key will not change in the same time
    let id = this.ar.snapshot.paramMap.get('key');

    // get product
    if (id) {
      this.key = id;

      this.productSer
        .getById(this.key)
        // take > unsunscribe after one time of use
        .pipe(take(1))
        .subscribe((p) => {
          if (p) {
            this.form.patchValue(p);
          }
        });
    }

    // categories
    this.categories$ = this.categorySer.getAll();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  get formCtls() {
    return this.form.controls;
  }

  async addProduct() {
    if (await this.productSer.add(this.form.value))
      this._snackBar.open('Added successfully', 'X', {
        duration: 5000,
        horizontalPosition: 'right',
      });
    this.router.navigate(['admin/products'], { replaceUrl: true });
  }

  editProduct() {
    this.productSer.update(this.key, this.form.value);
    this.router.navigate(['admin/products'], { replaceUrl: true });
  }

  openDialog(modal: any) {
    this.modalService.open(modal);
  }

  deleteProduct(modal: any) {
    this.modalService.dismissAll(modal);

    this.productSer.delete(this.key);
    this.router.navigate(['admin/products'], { replaceUrl: true });
  }
}

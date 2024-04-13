import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { Product, Products } from '../../types';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ProductComponent } from '../components/product/product.component';
import { ProductsService } from '../services/products.service';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductComponent, PaginatorModule, ButtonModule, EditPopupComponent, TooltipModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private productService: ProductsService) { }
  HOST = `http://localhost:3000`;
  API = `/api/v1`;
  URL = `${this.HOST}${this.API}`;
  isEdit: boolean = false;
  isAdd: boolean = false;

  productsArr: Product[] = [];
  myarr = [];
  defaultPage: number = 0;
  defaultPerPage: number = 5;
  totalRecords: number = 0;

  selectedProduct: Product = {
    id: 0,
    name: '',
    price: '',
    image: '',
    rating: 0
  };

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.isEdit = true;
    this.isAdd = false;
  }

  toggleDeletePopup(product: Product) {
    if (!product.id) {
      return;
    }
    this.deleteProduct(product.id);

  }

  toggleAddPopup() {
    this.isEdit = false;
    this.isAdd = true;
  }

  _reload() {
    this.fetchProducts(this.defaultPage, this.defaultPerPage);
  }



  fetchProducts(page: number, perPage: number) {
    const apiURL = `${this.URL}/clothes`;
    this.productService.getProducts(apiURL, { page: page, perPage: perPage }).subscribe(
      {
        next: (productItems: Products) => {
          console.log('Products list', productItems);
          this.productsArr = productItems.items;
          this.totalRecords = productItems.total;

        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  editProduct(product: Product, id: number) {
    const apiURL = `${this.URL}/clothes/${id}`;
    this.productService.editProduct(apiURL, product).subscribe(
      {
        next: (data) => {
          console.log(data);
          this._reload();
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  createProduct(product: Product) {
    const apiURL = `${this.URL}/clothes`;
    this.productService.addProduct(apiURL, product).subscribe(
      {
        next: (data) => {
          console.log(data);
          this._reload();
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  deleteProduct(id: number) {
    const apiURL = `${this.URL}/clothes/${id}`;
    this.productService.deleteProduct(apiURL).subscribe(
      {
        next: (data) => {
          console.log(data);
          this._reload();
        },
        error: (err) => {
          console.log(err);
        }
      });

  }


  onConfrimEdit(product: Product) {
    this.editProduct(product, this.selectedProduct.id ?? 0);
    this.isEdit = false;

  }

  onConfrimAdd(product: Product) {
    this.createProduct(product);
    this.isEdit = false;

  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);

  }
  ngOnInit(): void {
    this._reload();

  }

}

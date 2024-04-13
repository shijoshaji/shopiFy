import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Product } from '../../../types';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule, ButtonModule, ToastModule, ConfirmPopupModule, TooltipModule],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',

})
export class ProductComponent {

  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  @ViewChild('deleteBtn') deleteBtn: any;


  constructor(private confirmationService: ConfirmationService) { }


  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteBtn.nativeElement,
      message: 'Are you sure you want to Delete this???',
      accept: () => {
        this.deleteProduct();
      }
    });
  }

  editProduct() {
    this.edit.emit(this.product);

  }

  deleteProduct() {
    this.delete.emit(this.product);

  }

  show() {

  }

}

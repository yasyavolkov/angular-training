import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from "./components/product/product.component";
import { Product } from "./models/product";
import { ProductsService } from "./services/products.service";
import { Observable, tap } from "rxjs";
import { GlobalErrorComponent } from "./components/global-error/global-error.component";
import { FormsModule } from "@angular/forms";
import { FilterProductsPipe } from "./pipes/filter-products.pipe";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProductComponent, GlobalErrorComponent, FormsModule, FilterProductsPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-training';
  loading = false;
  products$: Observable<Product[]>;
  term = '';

  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.loading = true;
    this.products$ = this.productsService.getAll().pipe(tap(() => this.loading = false)
    );
  }
}

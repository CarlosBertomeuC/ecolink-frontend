import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StartupProductsService } from '../../../../services/StartupProducts.service';
import { Category } from '../../../../../startups/models/Category';
import { AuthService } from '../../../../../../auth/services/AuthService.service';
import { SubscriptionService } from '../../../../../subscriptions/services/subscription.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditing = false;
  imageUrl: string | null = null;
  categories: Category[] = [];
  planType: string = '';
  products: any[] = [];

  // Configuración del dropdown
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    allowSearchFilter: true,
    itemsShowLimit: 3,
    noDataAvailablePlaceholderText: 'No categories found'
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: StartupProductsService,
    private authService: AuthService,
    private subscriptionService: SubscriptionService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      categories: [[], Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.checkSubscription();
    this.loadProducts();

    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.isEditing = true;
      this.loadProduct(+productId);
    }
  }

  checkSubscription(): void {
    this.subscriptionService.getUserSubscription().subscribe(
      (response) => {
        this.planType = response.planType.toLowerCase();
      },
      (error) => {
        console.error('Error fetching subscription', error);
      }
    );
  }

  loadProducts(): void {
    this.productService.getStartupProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => console.error('Error loading products:', err)
    });
  }

  canAddProduct(): boolean {
    if (this.planType === 'free' && this.products.length >= 5) {
      return false;
    }
    if (this.planType === 'premium' && this.products.length >= 15) {
      return false;
    }
    return true;
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Error loading categories:', err)
    });
  }

  loadProduct(id: number): void {
    this.productService.getStartupProducts().subscribe({
      next: (products) => {
        const product = products.find(p => p.id === id);
        if (product) {
          this.productForm.patchValue(product);

          // Cargar la imagen del producto
          if (product.imageUrl) {
            this.authService.getImage('product', product.imageUrl).subscribe({
              next: (imageUrl: string) => {
                this.imageUrl = imageUrl;
              },
              error: (err) => console.error('Error loading product image:', err)
            });
          }
        }
      },
      error: (err) => console.error('Error loading product:', err)
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid || !this.canAddProduct()) {
      this.productForm.markAllAsTouched(); // Esto activa todas las validaciones pendientes
      return;
    }

    const selectedCategories = this.productForm.get('categories')?.value || [];
    const productData = {
      name: this.productForm.get('name')?.value,
      description: this.productForm.get('description')?.value,
      price: this.productForm.get('price')?.value,
      categories: selectedCategories.map((category: Category) => category.id)
    };

    const formData = new FormData();
    formData.append('product', JSON.stringify(productData));

    const imageFile = this.productForm.get('imageUrl')?.value;
    if (imageFile && imageFile instanceof File) {
      formData.append('image', imageFile);
    }

    if (this.isEditing) {
      const productId = this.route.snapshot.paramMap.get('id');
      if (productId) {
        formData.append('id', productId);
        this.productService.updateProduct(formData).subscribe({
          next: () => this.router.navigate(['/startup-dashboard/products']),
          error: (err) => console.error('Error updating product:', err)
        });
      }
    } else {
      this.productService.addProduct(formData).subscribe({
        next: () => this.router.navigate(['/startup-dashboard/products']),
        error: (err) => console.error('Error adding product:', err)
      });
    }
  }

  changeImage(fileInput: HTMLInputElement): void {
    if (!fileInput.files || fileInput.files.length === 0) {
      this.productForm.get('imageUrl')?.setValue(null);
      this.imageUrl = null;
      return;
    }

    const file = fileInput.files[0];
    this.productForm.get('imageUrl')?.setValue(file);

    const reader = new FileReader();
    reader.onload = () => (this.imageUrl = reader.result as string);
    reader.readAsDataURL(file);
  }

  // Función para validar las categorías
  validateCategories(): void {
    const categoriesControl = this.productForm.get('categories');
    if (!categoriesControl?.value || categoriesControl.value.length === 0) {
      categoriesControl?.setErrors({ required: true });
    } else {
      categoriesControl?.setErrors(null);
    }
    categoriesControl?.markAsTouched();
    categoriesControl?.updateValueAndValidity();
  }

  redirectToSubscriptions(): void {
    this.router.navigate(['/subscriptions']);
  }
}

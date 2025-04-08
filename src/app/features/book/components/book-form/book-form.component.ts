import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IBookRequest, ICategory } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../../category/services/category.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  providers: [BookService, CategoryService],
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  categories: ICategory[] = [];
  currentYear = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private categoryService: CategoryService,
    public router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      author: ['', [Validators.required, Validators.maxLength(255)]],
      isbn: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.maxLength(1000)]],
      yearPublication: [null, [
        Validators.required,
        Validators.min(1000),
        Validators.max(this.currentYear)
      ]],
      categoryId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => this.categories = categories,
      error: (err) => console.error('Error al cargar las categorías', err)
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const bookRequest: IBookRequest = {
        ...this.bookForm.value,
        yearPublication: Number(this.bookForm.value.yearPublication)
      };

      this.bookService.createBook(bookRequest).subscribe({
        next: () => {
          alert('Libro creado exitosamente');
          this.router.navigate(['/books']);
        },
        error: (err) => {
          console.error('Error al crear el libro', err);
          alert('Error al crear el libro');
        }
      });
    } else {
      this.markFormGroupTouched(this.bookForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}

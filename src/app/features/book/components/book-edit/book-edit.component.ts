import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IBookResponse, ICategory, IUpdateBookRequest } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../category/services/category.service';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  providers: [BookService, CategoryService],
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent implements OnInit{

  bookForm: FormGroup;
  categories: ICategory[] = [];
  currentYear = new Date().getFullYear();
  bookId!: number;
  originalBookData!: IBookResponse;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private categoryService: CategoryService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      author: ['', [Validators.required, Validators.maxLength(255)]],
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
    this.loadData();
  }

  loadData(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.bookId = Number(params.get('id'));
        return this.bookService.getBookById(this.bookId);
      })
    ).subscribe({
      next: (book) => {
        this.originalBookData = book;
        this.patchFormValues(book);
        this.loadCategories();
      },
      error: (err) => {
        console.error('Error loading book', err);
        this.router.navigate(['/libros']);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        // Asegurar que la categoría actual esté seleccionada
        if (this.originalBookData.category) {
          this.bookForm.patchValue({
            categoryId: this.originalBookData.category.id
          });
        }
      },
      error: (err) => console.error('Error loading categories', err)
    });
  }

  patchFormValues(book: IBookResponse): void {
    this.bookForm.patchValue({
      title: book.title,
      author: book.author,
      description: book.description || '',
      yearPublication: Number(book.yearPublication),
      categoryId: book.category?.id || null
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const updateData: IUpdateBookRequest = {
        ...this.bookForm.value,
        yearPublication: Number(this.bookForm.value.yearPublication)
      };

      this.bookService.updateBook(this.bookId, updateData).subscribe({
        next: () => {
          alert('Libro actualizado exitosamente');
          this.router.navigate(['/books']);
        },
        error: (err) => {
          console.error('Error updating book', err);
          alert('Error al actualizar el libro');
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

  hasChanges(): boolean {
    if (!this.originalBookData) return false;
    
    const formValues = this.bookForm.value;
    return (
      formValues.title !== this.originalBookData.title ||
      formValues.author !== this.originalBookData.author ||
      formValues.description !== (this.originalBookData.description || '') ||
      Number(formValues.yearPublication) !== Number(this.originalBookData.yearPublication) ||
      Number(formValues.categoryId) !== (this.originalBookData.category?.id || null)
    );
  }
}

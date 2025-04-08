import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../../../student/services/student.service';
import { BookService } from '../../../book/services/book.service';
import { LoanService } from '../../services/loan.service';
import { Router } from '@angular/router';
import { CopybookService } from '../../../copybook/services/copybook.service';
import { CategoryDTO, CopyBookDTO, CreateLoanDTO } from '../../models/loan.model';
import { IStudentResponse } from '../../../student/models/student.model';
import { CategoryService } from '../../../category/services/category.service';
import { IBookResponse } from '../../../book/models/book.model';
import { distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-loan-form',
  standalone: true,
  providers: [StudentService, BookService, CopybookService, LoanService, CategoryService],
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './loan-form.component.html',
  styleUrl: './loan-form.component.css'
})
export class LoanFormComponent implements OnInit{

  loanForm: FormGroup;
  categories: CategoryDTO[] = [];
  books: IBookResponse[] = [];
  copies: CopyBookDTO[] = [];
  students: IStudentResponse[] = [];
  loadingStudents = false;
  private searchTerms = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private loanService: LoanService,
    private bookService: BookService,
    private studentService: StudentService,
    private copyBookService: CopybookService,
    private categoryService: CategoryService,
    public router: Router
  ) {
    this.loanForm = this.fb.group({
      categoryId: [null, Validators.required],
      bookId: [null, Validators.required],
      copyId: [null, Validators.required],
      studentId: [null, Validators.required],
      loanDays: [7, [Validators.required, Validators.min(1), Validators.max(15)]]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.setupFormListeners();
    this.loadAllStudents();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        console.log('Categorías cargadas:', categories); // Debug
      },
      error: (err) => console.error('Error al cargar las categorías', err)
    });
  }

  setupFormListeners(): void {
    // Listener para cambios en categoría
    this.loanForm.get('categoryId')?.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(categoryId => {
      console.log('Categoría seleccionada:', categoryId); // Debug
      this.loanForm.get('bookId')?.reset();
      this.loanForm.get('copyId')?.reset();
      this.books = [];
      this.copies = [];
      
      if (categoryId) {
        this.bookService.getBooksByCategory(categoryId).subscribe({
          next: (books) => {
            console.log('Libros cargados:', books); // Debug
            this.books = books;
          },
          error: (err) => {
            console.error('Error al cargar los libros', err);
            // Mostrar mensaje al usuario
            alert('Error al cargar libros.');
          }
        });
      }
    });

    // Listener para cambios en libro
    this.loanForm.get('bookId')?.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(bookId => {
      this.loanForm.get('copyId')?.reset();
      this.copies = [];
      
      if (bookId) {
        this.copyBookService.getCopiesByBook(bookId).subscribe({
          next: (copies) => {
            this.copies = copies.filter(c => c.status === 'AVAILABLE');
            console.log('Copias disponibles:', this.copies); // Debug
          },
          error: (err) => console.error('Error al cargar los ejemplares', err)
        });
      }
    });
  }

  loadAllStudents(): void {
    this.studentService.searchStudents().subscribe({
      next: (student) => {
        this.students = student;
      },
      error: (err) => {
        console.error('Error al cargar estudiantes', err);
      }
    });
  }

  onSubmit(): void {
    if (this.loanForm.valid) {
      const loanData: CreateLoanDTO = this.loanForm.value;
      
      this.loanService.createLoan(loanData).subscribe({
        next: () => {
          alert('Préstamo creado exitosamente');
          this.router.navigate(['/dash/loan']);
        },
        error: (err) => {
          console.error('Error al crear el préstamo', err);
          alert(`Error al crear préstamo: ${err.error?.message || 'Error desconocido'}`);
        }
      });
    }
  }
}

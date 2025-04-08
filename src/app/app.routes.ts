import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  {
    path: 'books',
    loadComponent: () =>
      import('./features/book/components/book-list/book-list.component').then(
        (m) => m.BookListComponent
      ),
  },
  {
    path: 'save-book',
    loadComponent: () =>
      import('./features/book/components/book-form/book-form.component').then(
        (m) => m.BookFormComponent
      ),
  },
  {
    path: 'edit-book/:id',
    loadComponent: () =>
      import('./features/book/components/book-edit/book-edit.component').then(
        (m) => m.BookEditComponent
      ),
  },
  {
    path: 'delete-book/:id',
    loadComponent: () =>
      import('./features/book/components/book-edit/book-edit.component').then(
        (m) => m.BookEditComponent
      ),
  },
  {
    path: 'dash/loan',
    loadComponent: () =>
      import('./features/loan/components/loan-dash/loan-dash.component').then(
        (m) => m.LoanDashComponent
      ),
  },
  {
    path: 'dash/loan/form',
    loadComponent: () =>
      import('./features/loan/components/loan-form/loan-form.component').then(
        (m) => m.LoanFormComponent
      ),
  }
];
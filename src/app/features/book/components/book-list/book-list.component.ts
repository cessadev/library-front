import { Component, OnInit } from '@angular/core';
import { IBookResponse, IErrorResponse } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  providers: [BookService],
  imports: [RouterModule, CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit{

  public books?: IBookResponse[];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadAllBooks();
  }

  loadAllBooks() {
    next:
    this.bookService.getAllBooks().subscribe(
      data => {
        this.books = data;
      }
    )
    error:
    console.error();
  }

  deleteBook(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          alert('Libro eliminado correctamente');
          this.loadAllBooks(); // Recargar la lista
        },
        error: (err: IErrorResponse) => {
          if (err.errorCode === 'DELETE_RESTRICTED') {
            alert(`${err.message}`);
          } else {
            console.error('Error al eliminar libro', err);
            alert('Error inesperado al eliminar el libro');
          }
        }
      });
    }
  }
}

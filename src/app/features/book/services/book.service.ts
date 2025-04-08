import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBookRequest, IBookResponse, IBookSimpleResponse, IErrorResponse, IUpdateBookRequest } from '../models/book.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = "http://localhost:8080/api/v1/books";

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<IBookResponse[]> {
    return this.http.get<IBookResponse[]>(this.apiUrl);
  }

  createBook(book: IBookRequest): Observable<IBookRequest> {
    return this.http.post<IBookRequest>(this.apiUrl, book)
  }

  getBookById(id: number): Observable<IBookResponse> {
    return this.http.get<IBookResponse>(`${this.apiUrl}/${id}`);
  }

  updateBook(id: number, book: IUpdateBookRequest): Observable<IBookResponse> {
    return this.http.put<IBookResponse>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<void | IErrorResponse> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 400) {
          return throwError(() => error.error as IErrorResponse);
        }
        return throwError(() => error);
      })
    );
  }

  getBooksByCategory(categoryId: number): Observable<IBookResponse[]> {
    return this.http.get<IBookResponse[]>(`${this.apiUrl}/by-category/${categoryId}`);
  }
}

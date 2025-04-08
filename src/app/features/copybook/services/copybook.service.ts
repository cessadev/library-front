import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CopyBookDTO } from '../../loan/models/loan.model';

@Injectable({
  providedIn: 'root'
})
export class CopybookService {

  private apiUrl = "http://localhost:8080/api/v1/copybooks"

  constructor(private http: HttpClient) { }

  getCopiesByBook(bookId: number): Observable<CopyBookDTO[]> {
    return this.http.get<CopyBookDTO[]>(`${this.apiUrl}/by-book/${bookId}`);
  }
}

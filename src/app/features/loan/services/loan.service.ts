import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateLoanDTO, LoanDTO } from '../models/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private apiUrl = 'http://localhost:8080/api/v1/loans';

  constructor(private http: HttpClient) { }

  getAllLoans(): Observable<LoanDTO[]> {
    return this.http.get<LoanDTO[]>(this.apiUrl);
  }

  createLoan(loan: CreateLoanDTO): Observable<LoanDTO> {
    return this.http.post<LoanDTO>(this.apiUrl, loan);
  }

  returnLoan(loanId: number): Observable<LoanDTO> {
    return this.http.put<LoanDTO>(`${this.apiUrl}/${loanId}/return`, {});
  }
}

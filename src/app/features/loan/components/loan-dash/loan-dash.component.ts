import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoanService } from '../../services/loan.service';
import { LoanDTO } from '../../models/loan.model';

@Component({
  selector: 'app-loan-dash',
  standalone: true,
  providers: [LoanService],
  imports: [CommonModule, RouterModule],
  templateUrl: './loan-dash.component.html',
  styleUrl: './loan-dash.component.css'
})
export class LoanDashComponent implements OnInit{

  loans: LoanDTO[] = [];
  isLoading = false;
  currentlyReturningId: number | null = null;
  isReturning: boolean | undefined;

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loadAllLoans();
  }

  loadAllLoans() {
    this.loanService.getAllLoans().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.loans = data;
      },
      error: (err) => {
        console.error('Error al cargar los préstamos:', err);
      }
    });
  }

  returnLoan(loanId: number): void {
    const loan = this.loans.find(l => l.id === loanId);
    
    // Verificar si el préstamo ya está marcado como devuelto
    if (loan && loan.status !== 'ACTIVE') {
      alert('Este préstamo ya ha sido devuelto');
      this.loadAllLoans();
      return;
    }

    const confirmMessage = loan?.copyBook.id 
      ? `¿Estás seguro que deseas registrar la devolución del libro "${loan.copyBook.id}"?`
      : '¿Estás seguro que deseas registrar la devolución de este préstamo?';

    if (!confirm(confirmMessage)) {
      return;
    }

    this.currentlyReturningId = loanId;
    this.isReturning = true;

    this.loanService.returnLoan(loanId).subscribe({
      next: (returnedLoan) => {
        const successMessage = returnedLoan.copyBook.code
          ? `Libro "${returnedLoan.copyBook.code}" devuelto correctamente`
          : 'Devolución registrada correctamente';
        
        alert(successMessage);
        this.loadAllLoans();
      },
      error: (err) => {
        console.error('Error al devolver el préstamo:', err);
        
        let errorMessage = 'Ocurrió un error al registrar la devolución';
        if (err.status === 400) {
          errorMessage = err.error?.message || 'Este préstamo ya fue devuelto anteriormente';
          this.loadAllLoans();
        } else if (err.error?.message) {
          errorMessage = err.error.message;
        }
        
        alert(errorMessage);
      },
      complete: () => {
        this.isReturning = false;
        this.currentlyReturningId = null;
      }
    });
  }
}

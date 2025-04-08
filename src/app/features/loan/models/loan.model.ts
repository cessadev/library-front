export enum ELoanStatus {
  ACTIVE = 'ACTIVE',
  RETURNED = 'RETURNED',
  OVERDUE = 'OVERDUE',
  LOST = 'LOST'
}

export interface CopyBookSimpleDTO {
  id: number;
  code: string;
}

export interface StudentSimpleDTO {
  id: number;
  name: string;
  lastname: string;
}

export interface LoanDTO {
  id: number;
  loanDate: string;
  estimatedReturnDate: string;
  actualReturnDate: string | null;
  status: ELoanStatus;
  copyBook: CopyBookSimpleDTO;
  student: StudentSimpleDTO;
}

export interface LoanDetailDTO extends LoanDTO {
  bookTitle: string;
  bookAuthor: string;
  studentFullName: string;
  daysOverdue?: number;
}

export interface CreateLoanDTO {
  categoryId: number;
  bookId: number;
  copyId: number;
  studentId: number;
  loanDays: number;
}

export interface CategoryDTO {
  id: number;
  name: string;
}

export interface BookDTO {
  id: number;
  title: string;
  author: string;
  categoryId: number;
}

export interface CopyBookDTO {
  id: number;
  code: string;
  status: ECopyBookStatus;
  bookId: number;
}

export enum ECopyBookStatus {
  AVAILABLE = 'AVAILABLE',
  LOANED = 'LOANED',
  LOST = 'LOST',
  MAINTENANCE = 'MAINTENANCE'
}


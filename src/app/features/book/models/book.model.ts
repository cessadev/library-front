export interface IBookResponse {
  id: number;
  title: string;
  author: string;
  isbn: string;
  description: string;
  yearPublication: string;
  category: ICategory | null;
}

export interface IBookSimpleResponse {
  id: number;
  title: string;
  isbn: string;
}

export interface ICategory {
    id: number;
    name: string;
    description: string;
}

export interface IBookRequest {
    title: string;
    author: string;
    isbn: string;
    description?: string;
    yearPublication: number;
    categoryId: number;
}

export interface IUpdateBookRequest {
  title: string;
  author: string;
  description?: string;
  yearPublication: number;
  categoryId: number;
}

export interface IErrorResponse {
  errorCode: string;
  message: string;
  details: {
    bookId: number;
    timestamp: string;
    [key: string]: any;
  };
}
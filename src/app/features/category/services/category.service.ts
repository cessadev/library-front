import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../models/category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = "http://localhost:8080/api/v1/categories";

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.apiUrl);
  }
}

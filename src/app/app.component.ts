import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LayoutComponent } from "./core/components/layout/layout.component";
import { HttpClientModule } from '@angular/common/http';
import { corsInterceptorProvider } from './core/interceptor/cors.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [corsInterceptorProvider],
  imports: [CommonModule, HttpClientModule, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'library-front';
}

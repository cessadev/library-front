import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CorsInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                'Access-Control-Allow-Origin': 'http://localhost:4200/', // Cambia esto con la URL de tu frontend
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': '*'
            }
        });
        return next.handle(request);
    }
}

export const corsInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: CorsInterceptor,
    multi: true
};
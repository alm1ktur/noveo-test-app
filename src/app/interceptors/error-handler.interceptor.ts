import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../services/error-handler.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private errorHandler: ErrorHandlerService,
    protected store: Store<AppState>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorHandler.handle(error);
      })
    );
  }
}

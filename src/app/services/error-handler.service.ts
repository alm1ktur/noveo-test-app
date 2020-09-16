import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import * as UserActions from '../user/store/user.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { forceLogoutMessage } from '../models/enum/auth-error.enum';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) { }

  handleTest(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      return this.handleUnauthorizedError(error);
    }
    return throwError(error);
  }

  private handleUnauthorizedError(error: HttpErrorResponse): Observable<never> {
    this.snackBar.open(forceLogoutMessage.sessionIsExpired, 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
    this.store.dispatch(UserActions.logout());
    return throwError(error);
  }
}

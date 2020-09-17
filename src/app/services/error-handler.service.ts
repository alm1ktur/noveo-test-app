import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import * as UserActions from '../user/store/user.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessage } from '../models/enum/error-message.enum';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) { }

  handle(error: HttpErrorResponse): Observable<never> {
    switch (error.status) {
      case 401:
        this.handleUnauthorizedError(error);
        break;
      case 404:
        this.openSnackbar(ErrorMessage.badRequest);
        break;
      case 500:
        this.openSnackbar(ErrorMessage.serverError);
        break;
      default:
        this.openSnackbar(ErrorMessage.somethingWentWrong);
        break;
    }
    return throwError(error);
  }

  private handleUnauthorizedError(error: HttpErrorResponse): void {
    this.snackBar.open(ErrorMessage.sessionIsExpired, 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
    this.store.dispatch(UserActions.logout());
  }

  private openSnackbar(errorMessage: ErrorMessage): void {
    this.snackBar.open(errorMessage, 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}

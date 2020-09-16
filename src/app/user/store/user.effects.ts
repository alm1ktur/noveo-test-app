import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { from, Observable, of } from 'rxjs';
import * as fromUserActions from './user.actions';
import { LoginResponseI, UserI } from '../../models/interfaces/user.interface';
import { TypedAction } from '@ngrx/store/src/models';
import { NavigationService } from '../../services/navigation.service';

@Injectable()
export class UserEffects {
  userSignIn$ = createEffect(() => this.actions$.pipe(
    ofType(fromUserActions.authStart),
    exhaustMap(({ email, password }) => from(this.authRequest(email, password)).pipe(
      map((token) => this.authSuccessRoutine(email, token)),
      catchError(this.handleError)
    ))
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(fromUserActions.logout),
    tap(() => this.navigationService.navigateTo('login')),
  ), {
      dispatch: false
    });

  constructor(
    private actions$: Actions,
    private navigationService: NavigationService,
    private http: HttpClient
  ) {}

  private authRequest(email: string, password: string): Observable<any> {
    return this.http.post(
      `${environment.apiDomain}/login`,
      {
        email,
        password
      }).pipe(
        shareReplay()
    );
  }

  private authSuccessRoutine(email: string, token: LoginResponseI): TypedAction<string> & { user: UserI } {
    const user: UserI = {
      email,
      token: token.accessToken
    };
    return fromUserActions.authSuccess({ user });
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    return of(fromUserActions.authFail({ error: error.message }));
  }
}

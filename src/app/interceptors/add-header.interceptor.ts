import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppState } from '../store/app.reducer';
import { select, Store } from '@ngrx/store';
import * as fromUserSelectors from '../user/store/user.selectors';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<AppState>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isApi = req.url.includes(environment.apiDomain);
    return forkJoin({
      isAuthenticated: this.store.pipe(
        select(fromUserSelectors.isAuthenticated),
        take(1)
      ),
      getToken: this.store.pipe(
        select(fromUserSelectors.getToken),
        take(1)
      )
    }).pipe(
      switchMap(({isAuthenticated, getToken}) => {
        const request1: HttpRequest<any> = isApi && isAuthenticated ?
          req.clone({setHeaders: {Authorization: `Bearer ${getToken}`}}) :
          req.clone();

        return next.handle(request1);
      }));
  }
}

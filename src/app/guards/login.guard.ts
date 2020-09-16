import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import * as userSelectors from '../user/store/user.selectors';
import { NavigationService } from '../services/navigation.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private navigationService: NavigationService
  ) { }

  checkLogin(): Promise<boolean> {
    return this.store.select(userSelectors.isAuthenticated).pipe(
      take(1),
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          this.navigationService.navigateTo('/login');
          return false;
        }
        return true;
      })
    ).toPromise();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }

}

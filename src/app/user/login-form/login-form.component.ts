import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as appReducer from '../../store/app.reducer';
import { select, Store } from '@ngrx/store';
import * as userActions from '../store/user.actions';
import { Observable, Subject } from 'rxjs';
import * as userSelectors from '../store/user.selectors';
import { takeUntil } from 'rxjs/operators';
import { NavigationService } from '../../services/navigation.service';
import { LanguageType } from '../../models/types/language.type';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private http: HttpClient,
    private store: Store<appReducer.AppState>,
    private navigationService: NavigationService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(userSelectors.getIsAuthInProgress);
    this.store.pipe(
      select(userSelectors.isAuthenticated),
      takeUntil(this.destroy$)
    ).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.navigationService.navigateHome();
      }
    });
  }

  onSubmit(form): void {
    if (form.invalid) {
      return;
    }

    this.store.dispatch(
      userActions.authStart({
        email: form.value.email.trim(),
        password: form.value.password.trim()
      }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get language(): LanguageType {
    return this.translateService.currentLang as LanguageType;
  }

  changeLanguage(): void {
    this.translateService.use(this.language === 'en' ? 'ru' : 'en');
  }
}

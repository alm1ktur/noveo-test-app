import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { Observable } from 'rxjs';
import { UserI } from '../models/interfaces/user.interface';
import * as userSelectors from '../user/store/user.selectors';
import * as userActions from '../user/store/user.actions';
import { TranslateService } from '@ngx-translate/core';
import { LanguageType } from '../models/types/language.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$: Observable<UserI>;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(userSelectors.isAuthenticated);
    this.user$ = this.store.select(userSelectors.getUser);
  }

  logout(): void {
    this.store.dispatch(userActions.logout());
  }

  get language(): LanguageType {
    return this.translateService.currentLang as LanguageType;
  }

  changeLanguage(): void {
    this.translateService.use(this.language === 'en' ? 'ru' : 'en');
  }
}

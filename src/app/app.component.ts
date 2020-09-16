import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from './store/app.reducer';
import { Store } from '@ngrx/store';
import * as userSelectors from './user/store/user.selectors';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'noveo';
  isAuthenticated$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.translateService.use(environment.defaultLocale);
    this.isAuthenticated$ = this.store.select(userSelectors.isAuthenticated);
  }
}

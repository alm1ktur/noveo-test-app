import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../store/app.reducer';
import { MemoizedSelector } from '@ngrx/store';
import * as UserSelectors from '../user/store/user.selectors';
import { MockUser } from '../tests/constants/user.mock';
import { UserI } from '../models/interfaces/user.interface';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockStore: MockStore<AppState>;
  let mockIsAuthenticatedSelector: MemoizedSelector<AppState, boolean>;
  let mockIsGetUserSelector: MemoizedSelector<AppState, UserI>;
  let translateService: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [
        provideMockStore()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    mockIsGetUserSelector = mockStore.overrideSelector(
      UserSelectors.getUser,
      MockUser
    );
    mockIsAuthenticatedSelector = mockStore.overrideSelector(
      UserSelectors.isAuthenticated,
      true
    );
    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch action on logout', () => {
    const spy = spyOn(mockStore, 'dispatch');
    component.logout();
    expect(spy).toHaveBeenCalled();
  });

  it('should dispatch action on logout', () => {
    const spy = spyOn(mockStore, 'dispatch');
    component.logout();
    expect(spy).toHaveBeenCalled();
  });

  it('should change language', () => {
    translateService.use('ru');
    component.changeLanguage();
    expect(component.language).toEqual('en');
    component.changeLanguage();
    expect(component.language).toEqual('ru');
  });
});

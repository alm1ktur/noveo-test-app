import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NavigationTestModule } from '../../tests/navigation-test.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppState } from '../../store/app.reducer';
import { MemoizedSelector } from '@ngrx/store';
import * as UserSelectors from '../store/user.selectors';
import { NavigationService } from '../../services/navigation.service';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let mockStore: MockStore<AppState>;
  let navigationService: NavigationService;
  let mockUserIsAuthenticatedSelector: MemoizedSelector<AppState, boolean>;
  let mockUserIsAuthInProgressSelector: MemoizedSelector<AppState, boolean>;
  let translateService: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        NavigationTestModule,
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
    mockUserIsAuthenticatedSelector = mockStore.overrideSelector(
      UserSelectors.isAuthenticated,
      false
    );
    mockUserIsAuthInProgressSelector = mockStore.overrideSelector(
      UserSelectors.getIsAuthInProgress,
      false
    );
    translateService = TestBed.inject(TranslateService);
    navigationService = TestBed.inject(NavigationService);
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate home on authenticated', () => {
    const spyOnNavigateHome = spyOn(navigationService, 'navigateHome');
    mockUserIsAuthenticatedSelector.setResult(true);
    component.ngOnInit();
    expect(spyOnNavigateHome).toHaveBeenCalled();
    mockUserIsAuthenticatedSelector.setResult(false);
  });

  it('should dispatch on submit', () => {
    const spyOnDispatch = spyOn(mockStore, 'dispatch');
    const testForm = {
      invalid: true,
      value: {
        email: '',
        password: ''
      }
    };
    component.onSubmit(testForm);
    testForm.invalid = false;
    component.onSubmit(testForm);
    expect(spyOnDispatch).toHaveBeenCalledTimes(1);
  });

  it('should change language', () => {
    translateService.use('ru');
    component.changeLanguage();
    expect(component.language).toEqual('en');
    component.changeLanguage();
    expect(component.language).toEqual('ru');
  });
});

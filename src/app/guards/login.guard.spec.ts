import { async, TestBed } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { NavigationTestModule } from '../tests/navigation-test.module';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../store/app.reducer';
import { MemoizedSelector } from '@ngrx/store';
import * as UserSelectors from '../user/store/user.selectors';
import { NavigationService } from '../services/navigation.service';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let store: MockStore<AppState>;
  let mockIsAuthenticatedSelector: MemoizedSelector<AppState, boolean>;
  let navigationService: NavigationService;
  const routeMock: any = { snapshot: {}};
  const routeStateMock: any = { snapshot: {}, url: '/test'};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NavigationTestModule
      ],
      providers: [
        LoginGuard,
        provideMockStore()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    navigationService = TestBed.inject(NavigationService);
    mockIsAuthenticatedSelector = store.overrideSelector(
      UserSelectors.isAuthenticated,
      false
    );
    guard = TestBed.inject(LoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should be navigate on login if user is not authenticated', () => {
    const spy = spyOn(navigationService, 'navigateTo');
    guard.canActivate(routeMock, routeStateMock);
    mockIsAuthenticatedSelector.setResult(true);
    guard.canActivate(routeMock, routeStateMock);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

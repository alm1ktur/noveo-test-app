import { of, ReplaySubject, throwError } from 'rxjs';
import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserEffects } from './user.effects';
import { userInitialState } from './user.reducer';
import { NavigationTestModule } from '../../tests/navigation-test.module';
import { NavigationService } from '../../services/navigation.service';
import * as UserActions from './user.actions';
import { MockUser } from '../../tests/constants/user.mock';

describe('UserEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: UserEffects;
  let http: HttpClient;
  let navigationService: NavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        NavigationTestModule
      ],
      providers: [
        UserEffects,
        provideMockActions(() => actions),
        provideMockStore({ initialState: userInitialState })
      ]
    });

    effects = TestBed.inject(UserEffects);
    http = TestBed.inject(HttpClient);
    navigationService = TestBed.inject(NavigationService);
  });

  it('should be created', async(() => {
    expect(effects).toBeTruthy();
  }));

  it('#authStart should dispatch authSuccess or authFail', async(() => {
    const spy = spyOn(http, 'post').and.returnValues(of({ accessToken: MockUser.token }), throwError({ message: 'error' }));
    actions = new ReplaySubject(1);
    const signInAction = {
      type: UserActions.authStart.type,
      email: MockUser.email,
      password: ''
    };
    actions.next(signInAction);
    effects.userSignIn$.subscribe((item) => {
      expect(item).toEqual({ user: MockUser, type: UserActions.authSuccess.type });
    });
    expect(spy).toHaveBeenCalled();
    actions = new ReplaySubject(1);
    actions.next(signInAction);
    effects.userSignIn$.subscribe((item) => {
      expect(item).toEqual({ error: 'error', type: UserActions.authFail.type });
    });
    expect(spy).toHaveBeenCalled();
  }));

  it('#logout should navigate to login', async(() => {
    const spy = spyOn(navigationService, 'navigateTo');
    actions = new ReplaySubject(1);
    const logoutAction = {
      type: UserActions.logout.type
    };
    actions.next(logoutAction);
    effects.logout$.subscribe();
    expect(spy).toHaveBeenCalled();
  }));
});

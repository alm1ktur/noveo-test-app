import { initialUserState, reducer, userInitialState, UserState } from './user.reducer';
import * as UserActions from './user.actions';
import { MockUser } from '../../tests/constants/user.mock';

describe('UserReducer', () => {
  let state: UserState;

  beforeEach(() => {
    state = userInitialState;
  });

  describe('#Login', () => {
    it('authStart should set isLoading true', () => {
      const action = UserActions.authStart({ email: MockUser.email, password: ''});
      const result = reducer(state, action);

      expect(result.user).toEqual(initialUserState);
      expect(result.isLoading).toBeTruthy();
    });

    it('authSuccess should set isLoading false and set user', () => {
      const action = UserActions.authSuccess({ user: MockUser });
      const result = reducer(state, action);

      expect(result.user).toEqual(MockUser);
      expect(result.isLoading).toBeFalsy();
    });

    it('getRecordsStart should set error and isLoading false', () => {
      const action = UserActions.authFail({ error: 'error' });
      const result = reducer(state, action);

      expect(result.error).toEqual('error');
      expect(result.isLoading).toBeFalsy();
    });
  });

  it('logout should set user to initialUser and isLoading false', () => {
    const action = UserActions.logout();
    const result = reducer(state, action);

    expect(result.user).toEqual(initialUserState);
    expect(result.isLoading).toBeFalsy();
  });
});

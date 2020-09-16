import { MockUser } from '../../tests/constants/user.mock';
import { AppState } from '../../store/app.reducer';
import { userInitialState } from './user.reducer';
import { recordsInitialState } from '../../records/store/records.reducer';
import * as UserSelectors from './user.selectors';

describe('UserSelectors', () => {
  let state: AppState;

  beforeEach(() => {
    state = {
      user: userInitialState,
      records: recordsInitialState
    };
  });

  describe('User Selectors', () => {
    it('getUser should return user', () => {
      state = {
        user: {
          user: MockUser,
          isLoading: false,
          error: null
        },
        records: null
      };
      const results = UserSelectors.getUser(state);

      expect(results).toEqual(MockUser);
    });

    it('getIsAuthInProgress should return is auth loading', () => {
      state = {
        user: {
          user: MockUser,
          isLoading: false,
          error: null
        },
        records: null
      };
      const results = UserSelectors.getIsAuthInProgress(state);

      expect(results).toBeFalsy();
    });

    it('getAuthError should return record by id', () => {
      state = {
        user: {
          user: MockUser,
          isLoading: false,
          error: 'error'
        },
        records: null
      };
      const results = UserSelectors.getAuthError(state);

      expect(results).toEqual('error');
    });
  });

  it('isAuthenticated should return is user authenticated', () => {
    state = {
      user: {
        user: MockUser,
        isLoading: false,
        error: 'error'
      },
      records: null
    };
    const results = UserSelectors.isAuthenticated(state);

    expect(results).toBeTruthy();
  });

  it('isAuthenticated should return is user authenticated', () => {
    state = {
      user: {
        user: MockUser,
        isLoading: false,
        error: 'error'
      },
      records: null
    };
    const results = UserSelectors.getToken(state);

    expect(results).toEqual(MockUser.token);
  });
});

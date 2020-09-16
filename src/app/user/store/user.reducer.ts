import { UserI } from '../../models/interfaces/user.interface';
import { Action, createReducer, on } from '@ngrx/store';
import { authFail, authStart, authSuccess, logout } from './user.actions';

export interface UserState {
  user: UserI;
  error: string;
  isLoading: boolean;
}

export const initialUserState: UserI = {
  email: null,
  token: null
};

export const userInitialState: UserState =  {
  user: initialUserState,
  error: null,
  isLoading: false
};

const userReducer = createReducer(
  userInitialState,
  on(
    authStart, (state) => ({ ...state, isLoading: true, error: null })
  ),
  on(
    authSuccess, (state, { user }) => ({ ...state, user, isLoading: false, error: null})
  ),
  on(
    authFail, (state, { error }) => ({ ...state, error, isLoading: false })
  ),
  on(
    logout, (state) => ({ ...state, user: { ...initialUserState }, isLoading: false, error: null })
  ),
);

export function reducer(state: UserState, action: Action): UserState {
  return userReducer(state, action);
}

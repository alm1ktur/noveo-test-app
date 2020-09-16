import { createAction, props } from '@ngrx/store';
import { UserI } from '../../models/interfaces/user.interface';

export const authStart = createAction(
  '[User] Sign in start',
  props<{ email: string, password: string }>()
);

export const authSuccess = createAction(
  '[User] Auth Success',
  props<{ user: UserI }>()
);

export const authFail = createAction(
  '[User] Auth Fail',
  props<{ error: string }>()
);

export const logout = createAction(
  '[User] Logout'
);

export const setToken = createAction(
  '[User] Set Token',
  props<{ token: string }>()
);

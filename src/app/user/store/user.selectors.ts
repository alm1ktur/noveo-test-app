import { createSelector } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';

export const selectUser = (state: AppState) => state.user;

export const getAuthError = createSelector(
  selectUser,
  ( state ) => state.error
);

export const getIsAuthInProgress = createSelector(
  selectUser,
  ( state ) => state.isLoading
);

export const getUser = createSelector(
  selectUser,
  ( state ) => state.user
);

export const isAuthenticated = createSelector(
  selectUser,
  ( state ) => !!state.user.token
);

export const getToken = createSelector(
  selectUser,
  ( state ) => state.user.token
);

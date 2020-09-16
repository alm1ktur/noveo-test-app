import * as user from '../user/store/user.reducer';
import * as records from '../records/store/records.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  user: user.UserState;
  records: records.RecordsState;
}

export const appReducer: ActionReducerMap<AppState> = {
  user: user.reducer,
  records: records.reducer
};

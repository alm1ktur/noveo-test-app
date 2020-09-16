import { RecordI } from '../../models/interfaces/records.interface';
import { Action, createReducer, on } from '@ngrx/store';
import * as recordsActions from './records.actions';

export interface RecordsState {
  records: RecordI[];
  error: string;
  isLoading: boolean;
}

export const recordsInitialState: RecordsState = {
  records: [],
  error: null,
  isLoading: false
};

const recordsReducer = createReducer(
  recordsInitialState,
  on(
    recordsActions.getRecordsStart,
    state => ({ ...state, isLoading: true, error: null })
  ),
  on(
    recordsActions.getRecordsFail,
    (state, { error }) => ({ ...state, isLoading: false, error })
  ),
  on(
    recordsActions.getRecordsSuccess,
    (state, { records }) => ({ ...state, records, isLoading: false, error: null })
  ),
  on(
    recordsActions.updateRecordStart,
    (state) => ({ ...state, isLoading: true, error: null })
  ),
  on(
    recordsActions.updateRecordFail,
    (state, { error }) => ({ ...state, isLoading: false, error })
  ),
  on(
    recordsActions.updateRecordSuccess,
    (state, { record }) => {
      const recordIndexToUpdate = state.records.findIndex(item => item.id === record.id);
      const newRecords = [ ...state.records ];
      newRecords[recordIndexToUpdate] = record;
      return {
        ...state,
        records: newRecords,
        error: null,
        isLoading: null
      };
    }
  )
);

export function reducer(state: RecordsState, action: Action): RecordsState {
  return recordsReducer(state, action);
}

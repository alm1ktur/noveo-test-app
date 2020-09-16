import { AppState } from '../../store/app.reducer';
import { createSelector } from '@ngrx/store';

export const selectRecords = (state: AppState) => state.records;

export const getRecords = createSelector(
  selectRecords,
  (records) => records.records
);

export const isRecordsLoading = createSelector(
  selectRecords,
  (records) => records.isLoading
);

export const getRecordsError = createSelector(
  selectRecords,
  (records) => records.error
);

export const getRecordById = createSelector(
  selectRecords,
  (records, props) => records.records.find(record => record.id === props.id)
);

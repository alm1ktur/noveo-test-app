import { recordsInitialState, RecordsState, reducer } from './records.reducer';
import * as recordsActions from './records.actions';
import { MockRecord, MockRecordsList } from '../../tests/constants/record.mock';

describe('RecordsReducer', () => {
  let state: RecordsState;

  beforeEach(() => {
    state = recordsInitialState;
  });

  describe('#getRecords', () => {
    it('getRecordsStart should set isLoading true', () => {
      const action = recordsActions.getRecordsStart();
      const result = reducer(state, action);

      expect(result.records).toEqual([]);
      expect(result.isLoading).toBeTruthy();
    });

    it('getRecordsSuccess should set isLoading false and set records', () => {
      const action = recordsActions.getRecordsSuccess({ records: MockRecordsList });
      const result = reducer(state, action);

      expect(result.records).toEqual(MockRecordsList);
      expect(result.isLoading).toBeFalsy();
    });

    it('getRecordsFail should set error and isLoading false', () => {
      const action = recordsActions.getRecordsFail({ error: 'error' });
      const result = reducer(state, action);

      expect(result.error).toEqual('error');
      expect(result.isLoading).toBeFalsy();
    });
  });

  describe('#updateRecord', () => {
    it('updateRecordStart should set isLoading true', () => {
      const action = recordsActions.updateRecordStart({ record: MockRecord });
      const result = reducer(state, action);

      expect(result.isLoading).toBeTruthy();
    });

    it('updateRecordSuccess should set isLoading false and update record', () => {
      const actionToMakeList = recordsActions.getRecordsSuccess({ records: MockRecordsList });
      const stateWithRecords = reducer(state, actionToMakeList);
      const action = recordsActions.updateRecordSuccess({ record: MockRecord });
      const result = reducer(stateWithRecords, action);

      expect(result.records.find(item => item.id === MockRecord.id)).toEqual(MockRecord);
      expect(result.isLoading).toBeFalsy();
    });

    it('updateRecordFail should set error and isLoading false', () => {
      const action = recordsActions.updateRecordFail({ error: 'error' });
      const result = reducer(state, action);

      expect(result.error).toEqual('error');
      expect(result.isLoading).toBeFalsy();
    });
  });
});

import { recordsInitialState } from './records.reducer';
import { MockRecord, MockRecordsList } from '../../tests/constants/record.mock';
import * as RecordsSelectors from './records.selectors';
import { AppState } from '../../store/app.reducer';
import { userInitialState } from '../../user/store/user.reducer';

describe('RecordsSelectors', () => {
  let state: AppState;

  beforeEach(() => {
    state = {
      user: userInitialState,
      records: recordsInitialState
    };
  });

  describe('Records Selectors', () => {
    it('getRecords should return records list', () => {
      state = {
        user: null,
        records: {
          records: MockRecordsList,
          isLoading: false,
          error: null
        },
      };
      const results = RecordsSelectors.getRecords(state);

      expect(results).toEqual(MockRecordsList);
    });

    it('isRecordsLoading should return is records loading', () => {
      state = {
        user: null,
        records: {
          records: MockRecordsList,
          isLoading: false,
          error: null
        },
      };
      const results = RecordsSelectors.isRecordsLoading(state);

      expect(results).toBeFalsy();
    });

    it('getRecordById should return record by id', () => {
      state = {
        user: null,
        records: {
          records: MockRecordsList,
          isLoading: false,
          error: null
        },
      };
      const results = RecordsSelectors.getRecordById(state, { id: 1 });

      expect(results).toEqual(MockRecord);
    });

    it('getRecordById should return record by id', () => {
      state = {
        user: null,
        records: {
          records: MockRecordsList,
          isLoading: false,
          error: 'error'
        },
      };
      const results = RecordsSelectors.getRecordsError(state);

      expect(results).toEqual('error');
    });
  });
});

import { of, ReplaySubject, throwError } from 'rxjs';
import { RecordsEffects } from './records.effects';
import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as RecordsActions from './records.actions';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MockRecord, MockRecordsList } from '../../tests/constants/record.mock';
import { recordsInitialState } from './records.reducer';

describe('RecordsEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: RecordsEffects;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        RecordsEffects,
        provideMockActions(() => actions),
        provideMockStore({ initialState: recordsInitialState })
      ]
    });

    effects = TestBed.inject(RecordsEffects);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', async(() => {
    expect(effects).toBeTruthy();
  }));

  it('#getRecordsStart should dispatch getRecordsSuccess or getRecordsFail', async(() => {
    const spy = spyOn(http, 'get').and.returnValues(of(MockRecordsList), throwError({ message: 'error' }));
    actions = new ReplaySubject(1);
    const getRecordsStartAction = {
      type: RecordsActions.getRecordsStart.type
    };
    actions.next(getRecordsStartAction);
    effects.getRecords$.subscribe((item) => {
      expect(item).toEqual({ records: MockRecordsList, type: RecordsActions.getRecordsSuccess.type });
    });
    expect(spy).toHaveBeenCalled();
    actions = new ReplaySubject(1);
    actions.next(getRecordsStartAction);
    effects.getRecords$.subscribe((item) => {
      expect(item).toEqual({ error: 'error', type: RecordsActions.getRecordsFail.type });
    });
    expect(spy).toHaveBeenCalled();
  }));

  it('#updateRecordsStart should dispatch updateRecordsSuccess or updateRecordsFail', async(() => {
    const spy = spyOn(http, 'put').and.returnValues(of(null), throwError({ message: 'error' }));
    actions = new ReplaySubject(1);
    const getRecordsUpdateAction = {
      type: RecordsActions.updateRecordStart.type,
      record: MockRecord
    };
    actions.next(getRecordsUpdateAction);
    effects.updateRecord$.subscribe((item) => {
      expect(item).toEqual({ type: RecordsActions.updateRecordSuccess.type, record: null });
    });
    expect(spy).toHaveBeenCalled();
    actions = new ReplaySubject(1);
    actions.next(getRecordsUpdateAction);
    effects.updateRecord$.subscribe((item) => {
      expect(item).toEqual({ type: RecordsActions.updateRecordFail.type, error: 'error' });
    });
    expect(spy).toHaveBeenCalled();
  }));
});

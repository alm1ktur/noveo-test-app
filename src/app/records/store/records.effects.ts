import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as recordsActions from './records.actions';
import { combineLatest, from, Observable, of, timer } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, exhaustMap, map, switchMap, take } from 'rxjs/operators';
import { RecordI } from '../../models/interfaces/records.interface';

@Injectable()
export class RecordsEffects {
  getRecords$ = createEffect(() => this.actions$.pipe(
    ofType(recordsActions.getRecordsStart),
    switchMap(() => {
      return combineLatest([timer(1000), this.recordsRequest()]).pipe(
        take(1),
        map(([, records]) => recordsActions.getRecordsSuccess({ records })),
        catchError((error: HttpErrorResponse) => of(recordsActions.getRecordsFail({ error: error.message })))
      );
    })
  ));

  updateRecord$ = createEffect(() => this.actions$.pipe(
    ofType(recordsActions.updateRecordStart),
    exhaustMap(({ record }) => from(this.recordUpdateRequest(record)).pipe(
      map((newRecord) => recordsActions.updateRecordSuccess({ record: newRecord })),
      catchError((error: HttpErrorResponse) => of(recordsActions.updateRecordFail({ error: error.message })))
    ))
  ));

  apiUrl = environment.apiDomain;

  constructor(
    private store: Store,
    private actions$: Actions,
    private http: HttpClient
  ) {}

  recordsRequest(): Observable<any>  {
    return this.http.get(`${this.apiUrl}/records`);
  }

  recordUpdateRequest(record: RecordI): Observable<RecordI> {
    return this.http.put<RecordI>(`${environment.apiDomain}/records/${record.id}`, record);
  }
}

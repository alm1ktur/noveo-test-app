import { createAction, props } from '@ngrx/store';
import { RecordI } from '../../models/interfaces/records.interface';

export const getRecordsStart = createAction(
  '[Records] Get Records Start'
);

export const getRecordsSuccess = createAction(
  '[Records] Get Records Success',
  props<{ records: RecordI[] }>()
);

export const getRecordsFail = createAction(
  '[Records] Get Records Fail',
  props<{ error: string }>()
);


export const updateRecordStart = createAction(
  '[Records] Update Record Start',
  props<{ record: RecordI }>()
);

export const updateRecordSuccess = createAction(
  '[Records] Update Record Success',
  props<{ record: RecordI }>()
);

export const updateRecordFail = createAction(
  '[Records] Update Record Fail',
  props<{ error: string }>()
);

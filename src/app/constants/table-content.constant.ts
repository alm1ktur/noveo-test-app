import { RecordI, RecordsRow } from '../models/interfaces/records.interface';
import { RecordsTypesEnum } from '../models/enum/records-types.enum';

export const TableContent: RecordsRow[] = [
  {
    key: 'id',
    header: 'Records.CallId',
    cell: (row: RecordI) => `${row.id}`,
    type: RecordsTypesEnum.default
  },
  {
    key: 'start',
    header: 'Records.CallStart',
    cell: (row: RecordI) => `${row.startedAt}`,
    type: RecordsTypesEnum.date
  },
  {
    key: 'ended',
    header: 'Records.CallEnded',
    cell: (row: RecordI) => `${row.finishedAt}`,
    type: RecordsTypesEnum.date
  },
  {
    key: 'duration',
    header: 'Records.CallDuration',
    cell: (row: RecordI) => `${row.duration}`,
    type: RecordsTypesEnum.default
  },
  {
    key: 'contact',
    header: 'Records.Contact',
    cell: (row: RecordI) => `${row.contactPhone}`,
    type: RecordsTypesEnum.phoneNumber
  }
];

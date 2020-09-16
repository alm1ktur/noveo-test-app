import { RecordsTypesEnum } from '../enum/records-types.enum';

export interface RecordI {
  channel: string;
  contactPhone: string;
  displayedNumber: string;
  duration: number;
  finishedAt: string;
  id: number;
  sessionId: string;
  startedAt: string;
  userId: number;
  wrapups: WrapupI[];
}

export interface WrapupI {
  agentId: number;
  wrapupComment: string;
  wrapupId: number;
}

export interface RecordsRow {
  key: string;
  type: RecordsTypesEnum;
  header: string;
  cell: (row: RecordI) => string;
}

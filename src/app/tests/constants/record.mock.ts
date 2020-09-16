import { RecordI } from '../../models/interfaces/records.interface';

export const MockRecord: RecordI = {
  channel: 'testChannel',
  contactPhone: '88005353535',
  displayedNumber: '88005353535',
  duration: 500,
  finishedAt: '05/02/2020 09:24:34',
  id: 1,
  sessionId: '111',
  startedAt: '05/02/2020 09:24:20',
  userId: 5,
  wrapups: [
    {
      agentId: 1,
      wrapupComment: 'comment',
      wrapupId: 1,
    }
  ]
};

export const MockRecordsList: RecordI[] = [
  MockRecord
];

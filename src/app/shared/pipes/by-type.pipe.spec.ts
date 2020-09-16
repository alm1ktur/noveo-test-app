import { ByTypePipe } from './by-type.pipe';
import { async, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { RecordsTypesEnum } from '../../models/enum/records-types.enum';

describe('ByTypePipe', () => {
  let pipe: ByTypePipe;
  let datePipe: DatePipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ByTypePipe,
        DatePipe
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    datePipe = TestBed.inject(DatePipe);
    pipe = new ByTypePipe(datePipe);
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  describe('#transform', () => {
    it('should return prettified number', () => {
      expect(pipe.transform('88005353535', RecordsTypesEnum.phoneNumber)).toEqual('+8 (800) 535-35-35');
    });

    it('should return prettified date', () => {
      expect(pipe.transform('05/02/2020 09:24:34', RecordsTypesEnum.date)).toEqual('Feb 5, 2020, 9:24:34 AM');
    });

    it('should return string', () => {
      expect(pipe.transform('test', RecordsTypesEnum.default)).toEqual('test');
    });
  });
});

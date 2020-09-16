import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RecordsTypesEnum } from '../../models/enum/records-types.enum';

@Pipe({
  name: 'byType'
})
export class ByTypePipe implements PipeTransform {

  constructor(
    private datePipe: DatePipe
  ) {}

  transform(value: string, type: RecordsTypesEnum): unknown {
    switch (type) {
      case RecordsTypesEnum.date:
        return this.datePipe.transform(this.convertDate(value), 'medium');
      case RecordsTypesEnum.phoneNumber:
        return  this.numberPrettifier(value);
      default:
        return  value;
    }
  }

  numberPrettifier(phone: string): string {
    return `+${phone.slice(0, 1)} (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9, 11)}`;
  }

  convertDate(date: string): string {
    const dateArray = date.split('/');
    return dateArray[1] + '/' + dateArray[0] + '/' + dateArray[2];
  }
}

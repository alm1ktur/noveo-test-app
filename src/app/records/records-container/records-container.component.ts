import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import * as recordsActions from '../store/records.actions';
import { Observable } from 'rxjs';
import { RecordI, RecordsRow } from '../../models/interfaces/records.interface';
import * as recordsSelectors from '../store/records.selectors';
import { NavigationService } from '../../services/navigation.service';
import { TableContent } from '../../constants/table-content.constant';
import { ColumnsType } from '../../models/types/columns.type';

@Component({
  selector: 'app-records-container',
  templateUrl: './records-container.component.html',
  styleUrls: ['./records-container.component.scss']
})
export class RecordsContainerComponent implements OnInit {
  records$: Observable<RecordI[]>;
  isLoading$: Observable<boolean>;
  columns: RecordsRow[] = TableContent;
  displayedColumns: ColumnsType[] = ['id', 'start', 'ended', 'duration', 'contact'];

  constructor(
    private store: Store<AppState>,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(recordsActions.getRecordsStart());
    this.records$ = this.store.select(recordsSelectors.getRecords);
    this.isLoading$ = this.store.select(recordsSelectors.isRecordsLoading);
  }

  openDetailsPage(record: RecordI): void {
    this.navigationService.navigateTo(`records/${record.id}`);
  }

  trackByFn(index, item): number {
    return item.id;
  }
}

import { Component, OnInit } from '@angular/core';
import { RecordI } from '../../models/interfaces/records.interface';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as RecordsSelector from '../store/records.selectors';
import { tap } from 'rxjs/operators';
import * as RecordsActions from '../store/records.actions';
import { RecordsTypesEnum } from '../../models/enum/records-types.enum';
import { clone } from 'ramda';
import { NavigationService } from '../../services/navigation.service';
import { AppState } from '../../store/app.reducer';

@Component({
  selector: 'app-pp-records-detail',
  templateUrl: './records-detail.component.html',
  styleUrls: ['./records-detail.component.scss']
})
export class RecordsDetailComponent implements OnInit {
  record: RecordI;
  isLoading$: Observable<boolean>;
  pipeType = RecordsTypesEnum;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    const recordId = Number(this.route.snapshot.params.id);
    this.store.pipe(
      select(RecordsSelector.getRecordById, { id: recordId }),
      tap((record: RecordI) => {
        if (!record) {
          this.store.dispatch(RecordsActions.getRecordsStart());
        }
      })
    ).subscribe((item) => {
      this.record = clone(item);
    });
    this.isLoading$ = this.store.pipe(
      select(RecordsSelector.isRecordsLoading)
    );
  }

  updateRecord(record: RecordI): void {
    this.store.dispatch(RecordsActions.updateRecordStart({ record }));
  }

  back(): void {
    this.navigationService.navigateHome();
  }

  trackByFn(index, item): number {
    return item.id;
  }
}

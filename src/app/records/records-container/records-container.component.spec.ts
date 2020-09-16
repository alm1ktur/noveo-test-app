import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsContainerComponent } from './records-container.component';
import { NavigationTestModule } from '../../tests/navigation-test.module';
import { MatTableModule } from '@angular/material/table';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormsModule } from '@angular/forms';
import { AppState } from '../../store/app.reducer';
import { MemoizedSelector } from '@ngrx/store';
import * as RecordsSelectors from '../store/records.selectors';
import { MockRecord, MockRecordsList } from '../../tests/constants/record.mock';
import { RecordI } from '../../models/interfaces/records.interface';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { NavigationService } from '../../services/navigation.service';

describe('RecordsContainerComponent', () => {
  let component: RecordsContainerComponent;
  let fixture: ComponentFixture<RecordsContainerComponent>;
  let mockStore: MockStore<AppState>;
  let mockGetRecordsSelector: MemoizedSelector<AppState, RecordI[]>;
  let mockIsRecordsLoadingSelector: MemoizedSelector<AppState, boolean>;
  let navigationService: NavigationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecordsContainerComponent
      ],
      imports: [
        NavigationTestModule,
        MatTableModule,
        FormsModule,
        TranslateModule.forRoot(),
        SharedModule.forRoot()
      ],
      providers: [
        provideMockStore()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    navigationService = TestBed.inject(NavigationService);
    mockGetRecordsSelector = mockStore.overrideSelector(
      RecordsSelectors.getRecords,
      MockRecordsList
    );
    mockIsRecordsLoadingSelector = mockStore.overrideSelector(
      RecordsSelectors.isRecordsLoading,
      false
    );
    fixture = TestBed.createComponent(RecordsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate on row click', () => {
    const spy = spyOn(navigationService, 'navigateTo');
    component.openDetailsPage(MockRecord);
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate on row click', () => {
    const spy = spyOn(navigationService, 'navigateTo');
    component.openDetailsPage(MockRecord);
    expect(spy).toHaveBeenCalled();
  });

  it('trackby should return id', () => {
    expect(component.trackByFn(0, { id: 1})).toEqual(1);
  });
});

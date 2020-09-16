import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsDetailComponent } from './records-detail.component';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NavigationTestModule } from '../../tests/navigation-test.module';
import * as RecordsSelectors from '../store/records.selectors';
import { RecordI } from '../../models/interfaces/records.interface';
import { MockRecord } from '../../tests/constants/record.mock';
import { AppState } from '../../store/app.reducer';
import { MaterialModule } from '../../material.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';

describe('RecordsDetailComponent', () => {
  let component: RecordsDetailComponent;
  let fixture: ComponentFixture<RecordsDetailComponent>;
  let store: MockStore<AppState>;
  let navigationService: NavigationService;
  let mockRecordsByIdSelector: MemoizedSelector<AppState, RecordI>;
  let mockRecordsIsLoadingSelector: MemoizedSelector<AppState, boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsDetailComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: 1
              }
            }
          }
        },
        provideMockStore()
      ],
      imports: [
        HttpClientModule,
        NavigationTestModule,
        MaterialModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        SharedModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    navigationService = TestBed.inject(NavigationService);
    mockRecordsByIdSelector = store.overrideSelector(
      RecordsSelectors.getRecordById,
      MockRecord
    ) as MemoizedSelector<AppState, RecordI>;
    mockRecordsIsLoadingSelector = store.overrideSelector(
      RecordsSelectors.isRecordsLoading,
      false
    );
    fixture = TestBed.createComponent(RecordsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate home on click back', () => {
    const spyOnBack = spyOn(navigationService, 'navigateHome');
    component.back();
    expect(spyOnBack).toHaveBeenCalled();
  });

  it('should dispatch action on no records', () => {
    const spyOnDispatch = spyOn(store, 'dispatch');
    mockRecordsByIdSelector.setResult(null);
    component.ngOnInit();
    expect(spyOnDispatch).toHaveBeenCalled();
  });

  it('should dispatch action on no update record', () => {
    const spyOnDispatch = spyOn(store, 'dispatch');
    component.updateRecord(null);
    expect(spyOnDispatch).toHaveBeenCalled();
  });

  it('trackby should return id', () => {
    expect(component.trackByFn(0, { id: 1})).toEqual(1);
  });

});

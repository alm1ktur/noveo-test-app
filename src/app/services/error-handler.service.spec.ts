import { TestBed } from '@angular/core/testing';

import { ErrorHandlerService } from './error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../store/app.reducer';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let mockStore: MockStore<AppState>;
  let snackBarService: MatSnackBar;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      MatSnackBarModule,
    ],
    providers: [
      ErrorHandlerService,
      provideMockStore()
    ]
  }));

  beforeEach(() => {
    snackBarService = TestBed.inject(MatSnackBar);
    mockStore = TestBed.inject(MockStore);
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle error', () => {
    const spyOnDispatch = spyOn(mockStore, 'dispatch');
    const spyOnOpen = spyOn(snackBarService, 'open');
    const error: HttpErrorResponse = new HttpErrorResponse({ status: 401 });
    service.handleTest(error);
    expect(spyOnDispatch).toHaveBeenCalledTimes(1);
    expect(spyOnOpen).toHaveBeenCalledTimes(1);
    const error2: HttpErrorResponse = new HttpErrorResponse({ status: 500 });
    service.handleTest(error2);
    expect(spyOnDispatch).toHaveBeenCalledTimes(1);
    expect(spyOnOpen).toHaveBeenCalledTimes(1);
  });
});

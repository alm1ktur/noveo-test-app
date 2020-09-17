import { fakeAsync, TestBed } from '@angular/core/testing';

import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';
import { environment } from '../../environments/environment';
import { ErrorHandlerService } from '../services/error-handler.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';

describe('ErrorHandlerInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let errorHandlerService;
  let errorInterceptor: ErrorHandlerInterceptor;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      MatSnackBarModule
    ],
    providers: [
      ErrorHandlerInterceptor,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorHandlerInterceptor,
        multi: true
      },
      ErrorHandlerService,
      provideMockStore()
    ]
  }));

  beforeEach(() => {
    errorHandlerService = TestBed.inject(ErrorHandlerService);
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    errorInterceptor = TestBed.inject(ErrorHandlerInterceptor);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', fakeAsync(() => {
    expect(errorInterceptor).toBeTruthy();
  }));

  it('should handle error', fakeAsync(() => {
    const spy = spyOn(errorHandlerService, 'handle');
    http.get(`${environment.apiDomain}/records`).subscribe(() => throwError('error message'));
    const req = httpMock.expectOne(`${environment.apiDomain}/records`);
    req.flush('error');
  }));
});

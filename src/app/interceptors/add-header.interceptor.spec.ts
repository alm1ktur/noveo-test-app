import { TestBed } from '@angular/core/testing';
import { AddHeaderInterceptor } from './add-header.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../store/app.reducer';
import { MemoizedSelector } from '@ngrx/store';
import * as UserSelectors from '../user/store/user.selectors';
import { environment } from '../../environments/environment';

describe('AddHeaderInterceptor', () => {
  let mockStore: MockStore<AppState>;
  let mockUserIsAuthenticatedSelector: MemoizedSelector<AppState, boolean>;
  let mockUserGetTokenSelector: MemoizedSelector<AppState, string>;
  let httpMock: HttpTestingController;
  let http: HttpClient;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AddHeaderInterceptor,
        multi: true
      },
      provideMockStore()
    ]
  }));

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    mockUserIsAuthenticatedSelector = mockStore.overrideSelector(
      UserSelectors.isAuthenticated,
      true
    );
    mockUserGetTokenSelector = mockStore.overrideSelector(
      UserSelectors.getToken,
      'testToken'
    );
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be add header when authenticated', () => {
    mockUserIsAuthenticatedSelector.setResult(true);
    http.get(`${environment.apiDomain}/records`).subscribe(res => {
      expect(res).toBeTruthy();
    });
    const httpReq = httpMock.expectOne(`${environment.apiDomain}/records`);
    expect(httpReq.request.headers.get('Authorization')).toBe('Bearer testToken');
  });

  it('should not change when not authenticated', () => {
    mockUserIsAuthenticatedSelector.setResult(false);
    http.get(`${environment.apiDomain}/records`).subscribe(res => {
      expect(res).toBeTruthy();
    });
    const httpReq = httpMock.expectOne(`${environment.apiDomain}/records`);
    expect(httpReq.request.headers.has('Authorization')).toBeFalsy();
  });
});

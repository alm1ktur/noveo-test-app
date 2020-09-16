import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppState } from './store/app.reducer';
import { MemoizedSelector } from '@ngrx/store';
import * as UserSelectors from './user/store/user.selectors';

describe('AppComponent', () => {
  let mockStore: MockStore<AppState>;
  let mockUserIsAuthenticatedSelector: MemoizedSelector<AppState, boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [
        provideMockStore()
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    mockUserIsAuthenticatedSelector = mockStore.overrideSelector(
      UserSelectors.isAuthenticated,
      true
    );
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'noveo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('noveo');
  });
});

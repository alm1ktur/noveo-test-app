import { TestBed } from '@angular/core/testing';

import { NavigationService } from './navigation.service';
import { NavigationTestModule } from '../tests/navigation-test.module';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavigationService', () => {
  let service: NavigationService;
  let router: Router;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      NavigationTestModule,
      RouterTestingModule,
    ],
    providers: [
      NavigationService
    ]
  }));

  beforeEach(() => {
    service = TestBed.inject(NavigationService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate home', () => {
    const spy = spyOn(router, 'navigate');
    service.navigateHome();
    expect(spy).toHaveBeenCalledWith(['/records']);
  });

  it('should navigate to', () => {
    const spy = spyOn(router, 'navigate');
    service.navigateTo('/test');
    expect(spy).toHaveBeenCalledWith(['/test']);
    service.navigateTo(['/test']);
    expect(spy).toHaveBeenCalledWith(['/test']);
  });
});

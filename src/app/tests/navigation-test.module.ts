import { Injectable, NgModule } from '@angular/core';
import { NavigationService } from '../services/navigation.service';

@Injectable()
export class MockNavigationService {
  public navigateTo(url: string | Array<any>): Promise<boolean> {
    return Promise.resolve(true);
  }

  public navigateHome(url: string | Array<any>): Promise<boolean> {
    return Promise.resolve(true);
  }
}


@NgModule({
  declarations: [],
  imports: [ ],
  providers: [
    {
      provide: NavigationService, useClass: MockNavigationService
    }
  ]
})
export class NavigationTestModule {}

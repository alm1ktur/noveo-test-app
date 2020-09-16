import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private router: Router
  ) { }

  navigateHome(): Promise<boolean> {
    return this.router.navigate(['/records']);
  }

  navigateTo(url: string | Array<string>): Promise<boolean> {
    if (typeof url === 'string') {
      url = [ url ];
    }

    return this.router.navigate(url);
  }
}

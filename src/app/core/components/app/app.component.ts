import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public author = 'benjamin';

  constructor (
    private router: Router,
  ) {}

  public navigateToRoot (): void {
    this.router.navigate(['/']);
  }
}

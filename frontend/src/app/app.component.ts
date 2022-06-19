import { Component } from '@angular/core';
import { NavBarService } from './nav-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private NavBar: NavBarService) {}

  navBarClick() {
    this.NavBar.invert();
  }
}

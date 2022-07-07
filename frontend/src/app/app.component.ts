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
  toolBarClass() {
    if (this.NavBar.badNav) return 'warn';
    return 'primary';
  }
  isGoodNav = () => !this.NavBar.badNav;

  linesPath() {
    let result = '/assets/';
    if (this.NavBar.badNav) result += 'bad_lines.png';
    else result += 'good_lines.png';
    return result;
  }
}

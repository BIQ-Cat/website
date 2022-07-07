import { Component, OnInit } from '@angular/core';
import { NavBarService } from 'src/app/nav-bar.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  constructor(private navBar: NavBarService) {
    navBar.badNav = true;
    navBar.close();
  }

  ngOnInit(): void {}
}

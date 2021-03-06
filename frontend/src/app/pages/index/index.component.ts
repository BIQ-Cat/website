import { Component, OnInit } from '@angular/core';
import { NavBarService } from 'src/app/nav-bar.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(private navBar: NavBarService) {
    navBar.badNav = false;
    navBar.close();
  }

  ngOnInit(): void {}
}

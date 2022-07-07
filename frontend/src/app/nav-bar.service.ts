import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  private show = false;
  badNav = false;
  invert() {
    this.show = !this.show;
  }

  close() {
    this.show = false;
  }

  getClass() {
    return this.show ? 'show' : 'hide';
  }
}

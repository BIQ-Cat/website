import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';

import { SideMenuComponent } from './side-menu/side-menu.component';
import { NavBarService } from './nav-bar.service';
import { AppRoutingModule } from './AppRouting.module';

@NgModule({
  declarations: [AppComponent, SideMenuComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    MatToolbarModule,
    MatTreeModule,
  ],
  providers: [NavBarService],
  bootstrap: [AppComponent],
})
export class AppModule {}

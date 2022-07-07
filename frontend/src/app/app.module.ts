import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';

import { SideMenuComponent } from './side-menu/side-menu.component';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { NavBarService } from './nav-bar.service';
let routes: Routes = [
  { path: '', component: IndexComponent },
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    IndexComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatTreeModule,
  ],
  providers: [NavBarService],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [
    CoreComponent,
    NavbarComponent,
    SidebarComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  exports: [
    LoaderComponent
  ]
})
export class CoreModule { }

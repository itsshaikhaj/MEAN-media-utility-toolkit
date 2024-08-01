import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YoutubeRoutingModule } from './youtube-routing.module';
import { YoutubeComponent } from './youtube.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    YoutubeComponent
  ],
  imports: [
    CommonModule,
    YoutubeRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
    CoreModule
  ]
})
export class YoutubeModule { }

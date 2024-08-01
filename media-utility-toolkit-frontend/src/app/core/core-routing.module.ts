import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'youtube',
    pathMatch: 'full'
  },
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: 'youtube',
        loadChildren: () => import('./../features/youtube/youtube.module').then(m => m.YoutubeModule)
      },
      {
        path: 'instagram',
        loadChildren: () => import('./../features/instagram/instagram.module').then(m => m.InstagramModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'youtube' // Optionally handle undefined routes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

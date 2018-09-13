import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { MessengerPage } from '../messenger/messenger.page';
import { DoodlePage } from '../doodle/doodle.page';

import { ConnectionResolver } from '../connection-resolver.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    resolve: {
      connection: ConnectionResolver
    },
    children: [
      {
        path: 'home',
        outlet: 'home',
        component: HomePage
      },
      {
        path: 'messenger',
        outlet: 'messenger',
        component: MessengerPage
      },
      {
        path: 'doodle',
        outlet: 'doodle',
        component: DoodlePage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(home:home)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

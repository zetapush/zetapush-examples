import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { HomePageModule } from '../home/home.module';
import { MessengerPageModule } from '../messenger/messenger.module';
import { DoodlePageModule } from '../doodle/doodle.module';

import { AvatarCacheService } from './avatar-cache.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    MessengerPageModule,
    DoodlePageModule
  ],
  declarations: [TabsPage],
  providers: [AvatarCacheService]
})
export class TabsPageModule {}

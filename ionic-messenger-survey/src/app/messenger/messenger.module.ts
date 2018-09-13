import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessengerPage } from './messenger.page';
import { ScrollGlueDirective } from './scroll-glue.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [MessengerPage, ScrollGlueDirective]
})
export class MessengerPageModule {}

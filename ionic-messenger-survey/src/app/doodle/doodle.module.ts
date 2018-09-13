import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartsModule } from 'ng2-charts';

import { DoodlePage } from './doodle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartsModule
  ],
  declarations: [DoodlePage]
})
export class DoodlePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FilterTextboxComponent } from './filter-textbox.component';
import { AngularMaterialModule } from '../angular-material.module';
import { FilterService } from './services/filter.service';
import { PipeModule } from '../../_pipe/pipe.module';

@NgModule({
  imports: [CommonModule, FormsModule, AngularMaterialModule, PipeModule],
  exports: [FilterTextboxComponent],
  declarations: [FilterTextboxComponent],
  providers: [FilterService]
})
export class FilterTextboxModule {}

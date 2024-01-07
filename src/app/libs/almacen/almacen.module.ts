import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmacenRoutingModule } from './almacen-routing.module';
import { ProductoComponent } from './pages/producto/producto.component';
import { ProductoFormComponent } from './pages/producto/form/producto-form.component';
import { AlmacenComponent } from './pages/almacen/almacen.component';
import { AlmacenStockComponent } from './pages/almacen/stock/almacen-stock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/pipes/format-date-picker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { AlmacenStockFormComponent } from './pages/almacen/stock/form/almacen-stock-form.component';
import { EntradaComponent } from './pages/entrada/entrada.component';


@NgModule({
  declarations: [
    ProductoComponent,
    ProductoFormComponent,
    AlmacenComponent,
    AlmacenStockComponent,
    AlmacenStockFormComponent,
    EntradaComponent
  ],
  imports: [
    SharedMaterialModule,
    CommonModule,
    AlmacenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: APP_DATE_FORMATS,
    },
  ],
})
export class AlmacenModule { }

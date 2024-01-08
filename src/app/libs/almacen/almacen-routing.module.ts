import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './pages/producto/producto.component';
import { AlmacenComponent } from './pages/almacen/almacen.component';
import { AlmacenStockComponent } from './pages/almacen/stock/almacen-stock.component';
import { EntradaComponent } from './pages/entrada/entrada.component';
import { ActionComponent } from './pages/entrada/action/action.component';
import { DetailComponent } from './pages/entrada/detail/detail.component';

const routes: Routes = [
  {path: 'productos', component: ProductoComponent},
  {path: 'almacen-productos', component: AlmacenComponent},
  {path: 'almacen-productos/:almacenId', component: AlmacenStockComponent},
  {path: 'entrada-productos', component: EntradaComponent},
  {path: 'entrada-productos/action/:compraId', component: ActionComponent},
  {path: 'entrada-productos/detail/:compraId', component: DetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenRoutingModule { }

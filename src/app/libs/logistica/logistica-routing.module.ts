import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstablecimientoComponent } from './pages/establecimiento/establecimiento.component';
import { SucursalComponent } from './pages/sucursal/sucursal.component';
import { CajaComponent } from './pages/caja/caja.component';
import { AlmacenComponent } from './pages/almacen/almacen.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { TipoPagoComponent } from './pages/tipo-pago/tipo-pago.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';

const routes: Routes = [
  {path: 'establecimiento', component: EstablecimientoComponent},
  {path: 'sucursal', component: SucursalComponent},
  {path: 'caja', component: CajaComponent},
  {path: 'almacen', component: AlmacenComponent},
  {path: 'empleado', component: EmpleadoComponent},
  {path: 'tipo-pago', component: TipoPagoComponent},
  {path: 'proveedor', component: ProveedorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogisticaRoutingModule { }

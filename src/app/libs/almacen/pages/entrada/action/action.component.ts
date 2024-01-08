import { Component, OnInit } from '@angular/core';
import { CompraDetalleService } from '../../../services/compra-detalle.service';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { ActionFormComponent } from './form/action-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CompraService } from '../../../services/compra.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {


  data = Array<any>();
  entity: any = {};

  compraId = "";

  displayedColumns!: Array<string>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog,
    private overlay: Overlay,
    private compraDetalleService: CompraDetalleService,
    private compraService: CompraService
  ) { 
    this.compraId = this.activatedRoute.snapshot.paramMap.get('compraId') as string;
    this.initialComponent();
    this.loadData();
  }

  ngOnInit(): void {
  }

  private loadData() {
    this.compraDetalleService.index(this.compraId).subscribe({
      next: (response) => {
        this.entity = response.compra;
        this.data = response.detalle;
      },
      error: (e) => console.log(e),
    });
  }

  private initialComponent() {

    this.displayedColumns = [
      'producto',
      'unidad',
      'precio_unitario',
      'total',
      'actions'
    ];
  }

  openForm(dataId: number) {
    this.matDialog.open(ActionFormComponent, {
      width: '600px',
      panelClass: 'mat-dialog-padding',
      disableClose: true,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      data: {
        dataId: dataId,
        compraId: this.compraId,
        almacenId: this.entity.almacen_id
      }
    })
    .afterClosed()
    .subscribe((answer: boolean) => {
      if (answer) {
        this.loadData();
      }
    });
  }

  destroy(id: any){
    this.compraDetalleService.destroy(id).subscribe({
      next: () => { this.loadData();
      },
      error: (e) => console.log(e),
    })
  }

  cerrar() {
    this.compraService.close(this.entity.id).subscribe({
      next: () => { 
        this.router.navigateByUrl('/modulo/almacen/entrada-productos');
      },
      error: (e) => console.log(e),
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { CompraService } from '../../services/compra.service';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { CompraComponent } from './compra/compra.component';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.scss']
})
export class EntradaComponent implements OnInit {

  data = Array<any>();

  displayedColumns!: Array<string>;

  constructor(
    private matDialog: MatDialog,
    private overlay: Overlay,
    private compraService: CompraService
  ) { 
    this.initialComponent();
    this.loadData();
  }

  ngOnInit(): void {
  }

  private loadData() {
    this.compraService.index().subscribe({
      next: (response) => this.data = response,
      error: (e) => console.log(e),
    });
  }

  private initialComponent() {

    this.displayedColumns = [
      'proveedor',
      'empresa',
      'empleado',
      'fecha',
      'total',
      'estado',
      'actions'
    ];
  }

  openForm(dataId: number) {
    this.matDialog.open(CompraComponent, {
      width: '600px',
      panelClass: 'mat-dialog-padding',
      disableClose: true,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      data: dataId
    })
    .afterClosed()
    .subscribe((answer: boolean) => {
      if (answer) {
        this.loadData();
      }
    });
  }

  destroy(id: any){
    this.compraService.destroy(id).subscribe({
      next: () => { this.loadData();
      },
      error: (e) => console.log(e),
    })
  }
}

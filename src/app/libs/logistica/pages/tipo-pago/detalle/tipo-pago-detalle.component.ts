import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoPagoService } from '../../../services/tipo-pago.service';

@Component({
  selector: 'app-tipo-pago-detalle',
  templateUrl: './tipo-pago-detalle.component.html',
  styleUrls: ['./tipo-pago-detalle.component.scss']
})
export class TipoPagoDetalleComponent implements OnInit {
  isProcessing = false;

  sucursal_id: number = 0;

  newSuc = new Array<any>();
  nowSuc = new Array<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private ownDialogRef: MatDialogRef<TipoPagoDetalleComponent>,
    private tipoPagoService: TipoPagoService
  )  { 
    this.loadData();
  }
  
  ngOnInit(): void {

  }
  
  private loadData() {
    this.tipoPagoService.getSucursalesById(this.data).subscribe({
      next: (response) => {
        this.nowSuc = response.exits;
        this.newSuc = response.permisos;
      },
      error: (e) => console.log(e)
    });
  }
  

  addSucursal(){
    this.isProcessing = true;
    this.tipoPagoService.add(this.data, this.sucursal_id).subscribe(
      {
        next: (response) => {
          this.loadData();
          this.sucursal_id = 0;
          this.isProcessing = false;
        },
        error: (e) => {
          console.log(e)
          this.isProcessing = false;
        }
      }
    );
  }

  deleteSucursal(sucursal_id: any){
    this.isProcessing = true;
    this.tipoPagoService.dlt(this.data, sucursal_id).subscribe(
      {
        next: (response) => {
          this.loadData();
          this.sucursal_id = 0;
          this.isProcessing = false;
        },
        error: (e) => {
          console.log(e)
          this.isProcessing = false;
        }
      }
    );
  }
}

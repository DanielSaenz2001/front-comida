import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompraDetalleService } from 'src/app/libs/almacen/services/compra-detalle.service';

@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.scss']
})
export class ActionFormComponent implements OnInit {

  formGroup!: FormGroup;

  productos = new Array<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {dataId: number, compraId: string, almacenId: string},
    private ownDialogRef: MatDialogRef<ActionFormComponent>,
    private compraDetalleService: CompraDetalleService
  ) {
    this.formGroup = new FormGroup({
      id:           new FormControl(null),
      compra_id:       new FormControl(null),
      producto_id:  new FormControl(null, Validators.required),
      precio_unitario:    new FormControl(null, Validators.required),
      unidad:       new FormControl(null, Validators.required),
      total:       new FormControl(null),
    });
    this.loadData();
  }

  ngOnInit(): void {

  }
  
  private loadData() {

    this.compraDetalleService.getProductos(this.data.almacenId).subscribe({
      next: (response) => this.productos = response,
      error: (e) => console.log(e)
    });

    if (this.data.dataId > 0) {
      this.compraDetalleService.getById(this.data.dataId).subscribe({
        next: (response) => this.formGroup.setValue(response),
        error: (e) => console.log(e)
      });
    }
  }
  
  private create(){
    this.compraDetalleService.create(this.formGroup.value).subscribe({
      next: () => this.ownDialogRef.close(true),
      error: (e) => console.log(e)
    })
  }

  private update(){
    this.compraDetalleService.update(this.formGroup.value.id, this.formGroup.value).subscribe({
      next: () => this.ownDialogRef.close(true),
      error: (e) => console.log(e)
    })
  }

  save(event: Event) {
    event.stopPropagation();
    this.formGroup.value.compra_id = this.data.compraId;

    if(this.data.dataId > 0) {
      this.update();
    } else {
      this.create();
    }
  }
}

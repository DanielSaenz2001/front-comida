import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompraService } from '../../../services/compra.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent implements OnInit {

  formGroup!: FormGroup;

  almacenes = new Array<any>();
  proveedores = new Array<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private ownDialogRef: MatDialogRef<CompraComponent>,
    private compraService: CompraService
  ) { 
    this.formGroup = new FormGroup({
      id:           new FormControl(null),
      proveedor_id:  new FormControl(null, Validators.required),
      almacen_id:       new FormControl(null, Validators.required),
      sucursal_id:       new FormControl(null),
      empleado_id:       new FormControl(null),
      fecha:       new FormControl(null),
      total:       new FormControl(null),
      estado:       new FormControl(null),
    });
    this.loadData();
  }

  ngOnInit(): void {

  }
  
  private loadData() {
    
    this.compraService.getProveedores().subscribe({
      next: (response) => this.proveedores = response,
      error: (e) => console.log(e)
    });

    
    this.compraService.getAlmacenes().subscribe({
      next: (response) => this.almacenes = response,
      error: (e) => console.log(e)
    });
    
    if (this.data > 0) {
      /*this.compraService.getById(this.data).subscribe({
        next: (response) => this.formGroup.setValue(response),
        error: (e) => console.log(e)
      });*/
    }
  }
  
  private create(){
    this.compraService.create(this.formGroup.value).subscribe({
      next: () => this.ownDialogRef.close(true),
      error: (e) => console.log(e)
    })
  }

  private update(){
    this.compraService.update(this.formGroup.value.id, this.formGroup.value).subscribe({
      next: () => this.ownDialogRef.close(true),
      error: (e) => console.log(e)
    })
  }

  save(event: Event) {
    event.stopPropagation();

    if(this.data > 0) {
      this.update();
    } else {
      this.create();
    }
  }
}

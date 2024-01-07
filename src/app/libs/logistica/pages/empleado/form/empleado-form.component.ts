import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmpleadoService } from '../../../services/empleado.service';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.scss']
})
export class EmpleadoFormComponent implements OnInit {

  formGroup!: FormGroup;

  establecimientos = new Array<any>();
  usuarios = new Array<any>();
  cajas = new Array<any>();
  almacenes = new Array<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private ownDialogRef: MatDialogRef<EmpleadoFormComponent>,
    private empleadoService: EmpleadoService
  ) { 
    this.formGroup = new FormGroup({
      id:                 new FormControl(null),
      sucursal_id: new FormControl(null, Validators.required),
      user_id:          new FormControl(null, Validators.required),
      caja_id:      new FormControl(null),
      almacen_id:      new FormControl(null),
      isCaja:        new FormControl(false),
      isAlmacen:           new FormControl(false),
      isMoso:           new FormControl(false, Validators.required),
      estado:           new FormControl(false, Validators.required),
    });
    this.loadData();
  }

  ngOnInit(): void {

  }
  
  private loadData() {
    if (this.data > 0) {
      this.empleadoService.getById(this.data).subscribe({
        next: (response) => {
          this.formGroup.setValue(response)

          this.empleadoService.getAlmacenes(response.sucursal_id).subscribe({
            next: (response) => this.almacenes = response,
            error: (e) => console.log(e)
          });
      
          this.empleadoService.getCajas(response.sucursal_id).subscribe({
            next: (response) => this.cajas = response,
            error: (e) => console.log(e)
          });
        },
        error: (e) => console.log(e)
      });
      

    }

    this.empleadoService.getSucursales().subscribe({
      next: (response) => this.establecimientos = response,
      error: (e) => console.log(e)
    });

    this.empleadoService.getUsuarios().subscribe({
      next: (response) => this.usuarios = response,
      error: (e) => console.log(e)
    });
  }

  select(data: any) {
    this.empleadoService.getAlmacenes(data).subscribe({
      next: (response) => this.almacenes = response,
      error: (e) => console.log(e)
    });

    this.empleadoService.getCajas(data).subscribe({
      next: (response) => this.cajas = response,
      error: (e) => console.log(e)
    });
  }
  
  private create(){
    this.empleadoService.create(this.formGroup.value).subscribe({
      next: () => this.ownDialogRef.close(true),
      error: (e) => console.log(e)
    })
  }

  private update(){
    this.empleadoService.update(this.formGroup.value.id, this.formGroup.value).subscribe({
      next: () => this.ownDialogRef.close(true),
      error: (e) => console.log(e)
    })
  }

  save(event: Event) {
    event.stopPropagation();

    if (!this.formGroup.value.isCaja) {
      this.formGroup.controls['caja_id'].setValue(null);
    }

    if (!this.formGroup.value.isAlmacen) {
      this.formGroup.controls['almacen_id'].setValue(null);
    }

    if(this.data > 0) {
      this.update();
    } else {
      this.create();
    }
  }
}

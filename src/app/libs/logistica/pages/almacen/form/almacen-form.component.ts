import { Component, Inject, OnInit } from '@angular/core';
import { AlmacenService } from '../../../services/almacen.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-almacen-form',
  templateUrl: './almacen-form.component.html',
  styleUrls: ['./almacen-form.component.scss']
})
export class AlmacenFormComponent implements OnInit {

  formGroup!: FormGroup;

  sucursales = new Array<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private ownDialogRef: MatDialogRef<AlmacenFormComponent>,
    private almacenService: AlmacenService
  ) { 
    this.formGroup = new FormGroup({
      id:           new FormControl(null),
      sucursal_id:  new FormControl(null, Validators.required),
      direccion:    new FormControl(null, Validators.required),
      estado:       new FormControl(false, Validators.required),
    });
    this.loadData();
  }

  ngOnInit(): void {

  }
  
  private loadData() {
    if (this.data > 0) {
      this.almacenService.getById(this.data).subscribe({
        next: (response) => this.formGroup.setValue(response),
        error: (e) => console.log(e)
      });
    }

    this.almacenService.getSucursales().subscribe({
      next: (response) => this.sucursales = response,
      error: (e) => console.log(e)
    });
  }
  
  private create(){
    this.almacenService.create(this.formGroup.value).subscribe({
      next: () => this.ownDialogRef.close(true),
      error: (e) => console.log(e)
    })
  }

  private update(){
    this.almacenService.update(this.formGroup.value.id, this.formGroup.value).subscribe({
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

import { Component, Inject, OnInit } from '@angular/core';
import { CajaService } from '../../../services/caja.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-caja-form',
  templateUrl: './caja-form.component.html',
  styleUrls: ['./caja-form.component.scss']
})
export class CajaFormComponent implements OnInit {

  formGroup!: FormGroup;

  sucursales = new Array<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private ownDialogRef: MatDialogRef<CajaFormComponent>,
    private cajaService: CajaService
  ) { 
    this.formGroup = new FormGroup({
      id:           new FormControl(null),
      sucursal_id:  new FormControl(null, Validators.required),
      codigo:       new FormControl(null, Validators.required),
      estado:       new FormControl(false, Validators.required),
    });
    this.loadData();
  }

  ngOnInit(): void {

  }
  
  private loadData() {
    if (this.data > 0) {
      this.cajaService.getById(this.data).subscribe({
        next: (response) => this.formGroup.setValue(response),
        error: (e) => console.log(e)
      });
    }

    this.cajaService.getSucursales().subscribe({
      next: (response) => this.sucursales = response,
      error: (e) => console.log(e)
    });
  }
  
  private create(){
    this.cajaService.create(this.formGroup.value).subscribe({
      next: () => this.ownDialogRef.close(true),
      error: (e) => console.log(e)
    })
  }

  private update(){
    this.cajaService.update(this.formGroup.value.id, this.formGroup.value).subscribe({
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

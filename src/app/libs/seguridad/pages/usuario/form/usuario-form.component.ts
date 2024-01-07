import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../../services/usuario.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {

  formGroup!: FormGroup;
  datePipe: DatePipe = new DatePipe('es-PE');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number = 0,
    private ownDialogRef: MatDialogRef<UsuarioFormComponent>,
    private usuarioService: UsuarioService
  ) { 
    this.formGroup = new FormGroup({
      id:               new FormControl(null),
      dni:              new FormControl(null, [Validators.required, Validators.minLength(8),Validators.pattern(/^-?([0-9]\d*)?$/)]),
      nombres:          new FormControl(null, [Validators.required]),
      ap_paterno: new FormControl(null, [Validators.required]),
      ap_materno: new FormControl(null, [Validators.required]),
      direccion:        new FormControl(null),
      sexo:             new FormControl(null, [Validators.required]),
      email:            new FormControl(null, [Validators.required]),
      fec_nacimiento:   new FormControl(null, [Validators.required]),
      celular:          new FormControl(null, [Validators.required, Validators.minLength(9),Validators.pattern(/^-?([0-9]\d*)?$/)]),
      estado:           new FormControl(false, [Validators.required]),
      username:          new FormControl(null, [Validators.required]),
    });
    this.loadData();
  }

  ngOnInit(): void {

  }
  
  private loadData() {
    if (this.data > 0) {
      this.usuarioService.getById(this.data).subscribe({
        next: (response) => this.formGroup.setValue(response),
        error: (e) => console.log(e)
      });
    }
  }
  
  private create(){
    this.usuarioService.create(this.formGroup.value).subscribe({
      next: () => this.ownDialogRef.close(true),
      error: (e) => console.log(e)
    })
  }

  private update(){
    this.usuarioService.update(this.formGroup.value.id, this.formGroup.value).subscribe({
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

  // Método para formatear la fecha al ingresarla
  formatearFechaInput(event: any): void {
    const fechaSeleccionada: Date = event.value;
    const fechaFormateada: string = this.datePipe.transform(fechaSeleccionada, 'yyyy-MM-dd') || '';
    console.log(fechaFormateada);
    
    this.formGroup.patchValue({ fec_nacimiento: fechaFormateada });
  }
}

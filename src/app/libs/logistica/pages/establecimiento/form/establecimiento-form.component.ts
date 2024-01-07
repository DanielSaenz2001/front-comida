import { Component, Inject, OnInit } from '@angular/core';
import { EstablecimientoService } from '../../../services/establecimiento.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-establecimiento-form',
  templateUrl: './establecimiento-form.component.html',
  styleUrls: ['./establecimiento-form.component.scss']
})
export class EstablecimientoFormComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private ownDialogRef: MatDialogRef<EstablecimientoFormComponent>,
    private establecimientoService: EstablecimientoService
  ) { 
    this.formGroup = new FormGroup({
      id:               new FormControl(null),
      empresa:          new FormControl(null, Validators.required),
      ubicacion:        new FormControl(null, Validators.required),
      numero_contacto:  new FormControl(null, Validators.required),
      tipo:             new FormControl(null, Validators.required),
      representante:    new FormControl(null, Validators.required),
    });
    this.loadData();
  }

  ngOnInit(): void {

  }
  
  private loadData() {
    if (this.data > 0) {
      this.establecimientoService.getById(this.data).subscribe({
        next: (response) => this.formGroup.setValue(response),
        error: (e) => console.log(e)
      });
    }
  }
  
  private create(){
    this.establecimientoService.create(this.formGroup.value).subscribe({
      next: () => this.ownDialogRef.close(true),
      error: (e) => console.log(e)
    })
  }

  private update(){
    this.establecimientoService.update(this.formGroup.value.id, this.formGroup.value).subscribe({
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

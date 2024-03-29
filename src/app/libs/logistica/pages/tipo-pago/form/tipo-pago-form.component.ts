import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoPagoService } from '../../../services/tipo-pago.service';

@Component({
  selector: 'app-tipo-pago-form',
  templateUrl: './tipo-pago-form.component.html',
  styleUrls: ['./tipo-pago-form.component.scss']
})
export class TipoPagoFormComponent implements OnInit {

  formGroup!: FormGroup;

  sucursales = new Array<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private ownDialogRef: MatDialogRef<TipoPagoFormComponent>,
    private tipoPagoService: TipoPagoService
  ) { 
    this.formGroup = new FormGroup({
      id:       new FormControl(null),
      nombre:   new FormControl(null, Validators.required),
    });
    this.loadData();
  }

  ngOnInit(): void {

  }
  
  private loadData() {
    if (this.data > 0) {
      this.tipoPagoService.getById(this.data).subscribe({
        next: (response) => this.formGroup.setValue(response),
        error: (e) => console.log(e)
      });
    }

    this.tipoPagoService.getSucursales().subscribe({
      next: (response) => this.sucursales = response,
      error: (e) => console.log(e)
    });
  }
  
  private create(){
    this.tipoPagoService.create(this.formGroup.value).subscribe({
      next: () => this.ownDialogRef.close(true),
      error: (e) => console.log(e)
    })
  }

  private update(){
    this.tipoPagoService.update(this.formGroup.value.id, this.formGroup.value).subscribe({
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

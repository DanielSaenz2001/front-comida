import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SurcursalService } from '../../../services/surcursal.service';

@Component({
  selector: 'app-surcursal-form',
  templateUrl: './surcursal-form.component.html',
  styleUrls: ['./surcursal-form.component.scss']
})
export class SurcursalFormComponent implements OnInit {

  formGroup!: FormGroup;

  establecimientos = new Array<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private ownDialogRef: MatDialogRef<SurcursalFormComponent>,
    private surcursalService: SurcursalService
  ) { 
    this.formGroup = new FormGroup({
      id:                 new FormControl(null),
      establecimiento_id: new FormControl(null, Validators.required),
      direccion:          new FormControl(null, Validators.required),
      representante:      new FormControl(null, Validators.required),
      administrador:      new FormControl(null, Validators.required),
      coordinador:        new FormControl(null, Validators.required),
      telefono:           new FormControl(null, Validators.required),
    });
    this.loadData();
  }

  ngOnInit(): void {

  }
  
  private loadData() {
    if (this.data > 0) {
      this.surcursalService.getById(this.data).subscribe({
        next: (response) => this.formGroup.setValue(response),
        error: (e) => console.log(e)
      });
    }

    this.surcursalService.getEstablecimientos().subscribe({
      next: (response) => this.establecimientos = response,
      error: (e) => console.log(e)
    });
  }
  
  private create(){
    this.surcursalService.create(this.formGroup.value).subscribe({
      next: () => this.ownDialogRef.close(true),
      error: (e) => console.log(e)
    })
  }

  private update(){
    this.surcursalService.update(this.formGroup.value.id, this.formGroup.value).subscribe({
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

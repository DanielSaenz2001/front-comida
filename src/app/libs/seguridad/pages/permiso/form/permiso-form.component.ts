import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PermisoService } from '../../../services/permiso.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-permiso-form',
  templateUrl: './permiso-form.component.html',
  styleUrls: ['./permiso-form.component.scss']
})
export class PermisoFormComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private ownDialogRef: MatDialogRef<PermisoFormComponent>,
    private permisoService: PermisoService
  ) { 
    this.formGroup = new FormGroup({
      id:             new FormControl(null),
      nombre:         new FormControl(null, Validators.required),
      codigo:         new FormControl(null, Validators.required),
      activo:         new FormControl(true),
    });
    this.loadData();
  }

  ngOnInit(): void {

  }
  
  private loadData() {
    if (this.data > 0) {
      this.permisoService.getById(this.data).subscribe({
        next: (response) => this.formGroup.setValue(response),
        error: (e) => console.log(e)
      });
    }
  }
  
  private create(){
    this.permisoService.create(this.formGroup.value).subscribe({
      next: () => this.ownDialogRef.close(true),
      error: (e) => console.log(e)
    })
  }

  private update(){
    this.permisoService.update(this.formGroup.value.id, this.formGroup.value).subscribe({
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

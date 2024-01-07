import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlmacenService } from 'src/app/libs/almacen/services/almacen.service';

@Component({
  selector: 'app-almacen-stock-form',
  templateUrl: './almacen-stock-form.component.html',
  styleUrls: ['./almacen-stock-form.component.scss']
})
export class AlmacenStockFormComponent implements OnInit {

  formGroup!: FormGroup;

  productos = new Array<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {dataId: number, almacenId: string},
    private ownDialogRef: MatDialogRef<AlmacenStockFormComponent>,
    private almacenService: AlmacenService
  ) {
    this.formGroup = new FormGroup({
      id:           new FormControl(null),
      producto_id:  new FormControl(null, Validators.required),
      almacen_id:    new FormControl(null),
      stock:       new FormControl(null, Validators.required),
    });
    this.loadData();
  }

  ngOnInit(): void {

  }
  
  private loadData() {

    this.almacenService.getProductos(this.data.almacenId).subscribe({
      next: (response) => this.productos = response,
      error: (e) => console.log(e)
    });

    if (this.data.dataId > 0) {
      this.almacenService.getById(this.data).subscribe({
        next: (response) => this.formGroup.setValue(response),
        error: (e) => console.log(e)
      });
    }
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
    this.formGroup.value.almacen_id = this.data.almacenId;

    if(this.data.dataId > 0) {
      this.update();
    } else {
      this.create();
    }
  }
}

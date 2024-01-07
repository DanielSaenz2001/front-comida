import { Component, OnInit } from '@angular/core';
import { AlmacenService } from '../../services/almacen.service';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.scss']
})
export class AlmacenComponent implements OnInit {

  data = Array<any>();

  displayedColumns!: Array<string>;

  constructor(
    private matDialog: MatDialog,
    private overlay: Overlay,
    private almacenService: AlmacenService
  ) { 
    this.initialComponent();
    this.loadData();
  }

  ngOnInit(): void {
  }

  private loadData() {
    this.almacenService.getAlmacenes().subscribe({
      next: (response) => this.data = response,
      error: (e) => console.log(e),
    });
  }

  private initialComponent() {

    this.displayedColumns = [
      'empresa',
      'sucursal',
      'direccion',
      'estado',
      'actions'
    ];
  }
}

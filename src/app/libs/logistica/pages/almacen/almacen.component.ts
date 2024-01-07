import { Component, OnInit } from '@angular/core';
import { AlmacenFormComponent } from './form/almacen-form.component';
import { AlmacenService } from '../../services/almacen.service';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';

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
    this.almacenService.index().subscribe({
      next: (response) => this.data = response,
      error: (e) => console.log(e),
    });
  }

  destroy(id: any){
    this.almacenService.destroy(id).subscribe({
      next: () => { this.loadData();
      },
      error: (e) => console.log(e),
    })
  }

  private initialComponent() {

    this.displayedColumns = [
      'sucursal',
      'direccion',
      'estado',
      'actions'
    ];
  }
  
  openForm(dataId: number) {
    this.matDialog.open(AlmacenFormComponent, {
      width: '600px',
      panelClass: 'mat-dialog-padding',
      disableClose: true,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      data: dataId
    })
    .afterClosed()
    .subscribe((answer: boolean) => {
      if (answer) {
        this.loadData();
      }
    });
  }
}

import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AlmacenService } from '../../../services/almacen.service';
import { AlmacenStockFormComponent } from './form/almacen-stock-form.component';

@Component({
  selector: 'app-almacen-stock',
  templateUrl: './almacen-stock.component.html',
  styleUrls: ['./almacen-stock.component.scss']
})
export class AlmacenStockComponent implements OnInit {

  data = Array<any>();
  almacen: any = {};

  almacenId: string = "";

  displayedColumns!: Array<string>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private overlay: Overlay,
    private almacenService: AlmacenService
  ) { 
    this.almacenId = this.activatedRoute.snapshot.paramMap.get('almacenId') as string;
    this.initialComponent();
    this.loadData();
  }

  ngOnInit(): void {
  }

  private loadData() {
    this.almacenService.index(this.almacenId).subscribe({
      next: (response) => {
        this.almacen = response.almacen;
        this.data = response.data;
      },
      error: (e) => console.log(e),
    });
  }

  private initialComponent() {

    this.displayedColumns = [
      'nombre',
      'unidad',
      'stock',
      'complemento',
      'actions'
    ];
  }

  destroy(id: any){
    this.almacenService.destroy(id).subscribe({
      next: () => { this.loadData();
      },
      error: (e) => console.log(e),
    })
  }

  openForm(dataId: number) {
    this.matDialog.open(AlmacenStockFormComponent, {
      width: '600px',
      panelClass: 'mat-dialog-padding',
      disableClose: true,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      data: {
        dataId: dataId,
        almacenId: this.almacenId
      }
    })
    .afterClosed()
    .subscribe((answer: boolean) => {
      if (answer) {
        this.loadData();
      }
    });
  }
}

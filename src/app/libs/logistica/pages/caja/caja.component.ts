import { Component, OnInit } from '@angular/core';
import { CajaService } from '../../services/caja.service';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { CajaFormComponent } from './form/caja-form.component';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss']
})
export class CajaComponent implements OnInit {


  data = Array<any>();

  displayedColumns!: Array<string>;

  constructor(
    private matDialog: MatDialog,
    private overlay: Overlay,
    private cajaService: CajaService
  ) { 
    this.initialComponent();
    this.loadData();
  }

  ngOnInit(): void {
  }

  private loadData() {
    this.cajaService.index().subscribe({
      next: (response) => this.data = response,
      error: (e) => console.log(e),
    });
  }

  destroy(id: any){
    this.cajaService.destroy(id).subscribe({
      next: () => { this.loadData();
      },
      error: (e) => console.log(e),
    })
  }

  private initialComponent() {

    this.displayedColumns = [
      'sucursal',
      'codigo',
      'estado',
      'actions'
    ];
  }
  
  openForm(dataId: number) {
    this.matDialog.open(CajaFormComponent, {
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

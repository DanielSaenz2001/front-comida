import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EstablecimientoService } from '../../services/establecimiento.service';
import { EstablecimientoFormComponent } from './form/establecimiento-form.component';

@Component({
  selector: 'app-establecimiento',
  templateUrl: './establecimiento.component.html',
  styleUrls: ['./establecimiento.component.scss']
})
export class EstablecimientoComponent implements OnInit {

  data = Array<any>();

  displayedColumns!: Array<string>;

  constructor(
    private matDialog: MatDialog,
    private overlay: Overlay,
    private establecimientoService: EstablecimientoService
  ) { 
    this.initialComponent();
    this.loadData();
  }

  ngOnInit(): void {
  }

  private loadData() {
    this.establecimientoService.index().subscribe({
      next: (response) => this.data = response,
      error: (e) => console.log(e),
    });
  }

  destroy(id: any){
    this.establecimientoService.destroy(id).subscribe({
      next: () => { this.loadData();
      },
      error: (e) => console.log(e),
    })
  }

  private initialComponent() {

    this.displayedColumns = [
      'empresa',
      'ubicacion',
      'numero_contacto',
      'tipo',
      'representante',
      'actions'
    ];
  }
  
  openForm(dataId: number) {
    this.matDialog.open(EstablecimientoFormComponent, {
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

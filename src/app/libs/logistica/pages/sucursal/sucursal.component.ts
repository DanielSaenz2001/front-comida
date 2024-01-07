import { Component, OnInit } from '@angular/core';
import { SurcursalFormComponent } from './form/surcursal-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { SurcursalService } from '../../services/surcursal.service';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.scss']
})
export class SucursalComponent implements OnInit {

  data = Array<any>();

  displayedColumns!: Array<string>;

  constructor(
    private matDialog: MatDialog,
    private overlay: Overlay,
    private surcursalService: SurcursalService
  ) { 
    this.initialComponent();
    this.loadData();
  }

  ngOnInit(): void {
  }

  private loadData() {
    this.surcursalService.index().subscribe({
      next: (response) => this.data = response,
      error: (e) => console.log(e),
    });
  }

  destroy(id: any){
    this.surcursalService.destroy(id).subscribe({
      next: () => { this.loadData();
      },
      error: (e) => console.log(e),
    })
  }

  private initialComponent() {

    this.displayedColumns = [
      'empresa',
      'direccion',
      'representante',
      'administrador',
      'coordinador',
      'telefono',
      'actions'
    ];
  }
  
  openForm(dataId: number) {
    this.matDialog.open(SurcursalFormComponent, {
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

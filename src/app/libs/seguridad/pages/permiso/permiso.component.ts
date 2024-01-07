import { Component, OnInit } from '@angular/core';
import { PermisoService } from '../../services/permiso.service';
import { IPermiso } from '../../models/permiso.model';
import { MatDialog } from '@angular/material/dialog';
import { PermisoFormComponent } from './form/permiso-form.component';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-permiso',
  templateUrl: './permiso.component.html',
  styleUrls: ['./permiso.component.scss']
})
export class PermisoComponent implements OnInit {

  permisos = Array<IPermiso>();

  displayedColumns!: Array<string>;

  constructor(
    private matDialog: MatDialog,
    private overlay: Overlay,
    private permisoService: PermisoService
  ) { 
    this.initialComponent();
    this.loadData();
  }

  ngOnInit(): void {
  }

  private loadData() {
    this.permisoService.index().subscribe({
      next: (response) => this.permisos = response,
      error: (e) => console.log(e),
    });
  }

  destroy(id: any){
    this.permisoService.destroy(id).subscribe({
      next: () => { this.loadData();
      },
      error: (e) => console.log(e),
    })
  }

  private initialComponent() {

    this.displayedColumns = [
      'nombre',
      'codigo',
      'activo',
      'actions'
    ];
  }
  
  openForm(permisoId: number) {
    this.matDialog.open(PermisoFormComponent, {
      width: '600px',
      panelClass: 'mat-dialog-padding',
      disableClose: true,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      data: permisoId
    })
    .afterClosed()
    .subscribe((answer: boolean) => {
      if (answer) {
        this.loadData();
      }
    });
  }
}

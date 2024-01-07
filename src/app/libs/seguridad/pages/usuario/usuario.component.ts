import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { IDataUsuarioIndex } from '../../models/data-usuario-index.model';
import { IUsuario } from '../../models/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { UsuarioFormComponent } from './form/usuario-form.component';
import { UsuarioPermisoComponent } from './permiso/usuario-permiso.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  usuario = {} as IDataUsuarioIndex;
  usuarioData = new Array<IUsuario>();

  displayedColumns!: Array<string>;

  constructor(
    private matDialog: MatDialog,
    private overlay: Overlay,
    private usuarioService: UsuarioService
  ) { 
    this.initialComponent();
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.usuarioService.get().subscribe({
      next: (response) => {
        this.usuario = response;
        this.usuarioData = response.data;
      },
      error: (e) => console.log(e),
    });
  }

  prevPage() {
    this.usuarioService.getUserAtUrl(this.usuario?.prev_page_url!).subscribe({
      next: (response) => {
        this.usuario = response;
        this.usuarioData = response.data;
      },
      error: (e) => console.log(e),
    });
  }

  nextPage() {
    this.usuarioService.getUserAtUrl(this.usuario?.next_page_url!).subscribe({
      next: (response) => {
        this.usuario = response;
        this.usuarioData = response.data;
      },
      error: (e) => console.log(e),
    });
  }

  private initialComponent() {

    this.displayedColumns = [
      'nombres',
      'dni',
      'sexo',
      'email',
      'estado',
      'actions'
    ];
  }

  openForm(usuarioId: number) {
    this.matDialog.open(UsuarioFormComponent, {
      width: '600px',
      panelClass: 'mat-dialog-padding',
      disableClose: true,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      data: usuarioId
    })
    .afterClosed()
    .subscribe((answer: boolean) => {
      if (answer) {
        this.loadData();
      }
    });
  }

  openFormPermiso(usuarioId: number) {
    this.matDialog.open(UsuarioPermisoComponent, {
      width: '600px',
      panelClass: 'mat-dialog-padding',
      disableClose: true,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      data: usuarioId
    })
    .afterClosed()
    .subscribe((answer: boolean) => {
      if (answer) {
        this.loadData();
      }
    });
  }
}

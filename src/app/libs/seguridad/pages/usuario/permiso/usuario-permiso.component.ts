import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../../services/usuario.service';
import { IPermiso } from '../../../models/permiso.model';

@Component({
  selector: 'app-usuario-permiso',
  templateUrl: './usuario-permiso.component.html',
  styleUrls: ['./usuario-permiso.component.scss']
})
export class UsuarioPermisoComponent implements OnInit {
  isProcessing = false;

  permiso_id: number = 0;

  newPermisos = new Array<IPermiso>();
  nowPermisos = new Array<IPermiso>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number = 0,
    private ownDialogRef: MatDialogRef<UsuarioPermisoComponent>,
    private usuarioService: UsuarioService
  ) {
    this.loadData();
  }

  ngOnInit(): void {
  }

  private loadData() {
    this.usuarioService.getPermisosById(this.data).subscribe({
      next: (response) => {
        this.newPermisos = response.permi;
        this.nowPermisos = response.puser;
      },
      error: (e) => console.log(e)
    });
  }

  addPermiso(){
    this.isProcessing = true;
    this.usuarioService.addPermiso(this.data, this.permiso_id).subscribe(
      {
        next: (response) => {
          this.loadData();
          this.permiso_id = 0;
          this.isProcessing = false;
        },
        error: (e) => {
          console.log(e)
          this.isProcessing = false;
        }
      }
    );
  }

  deletePermiso(permiso_id: any){
    this.isProcessing = true;
    this.usuarioService.dltPermiso(this.data, permiso_id).subscribe(
      {
        next: (response) => {
          this.loadData();
          this.permiso_id = 0;
          this.isProcessing = false;
        },
        error: (e) => {
          console.log(e)
          this.isProcessing = false;
        }
      }
    );
  }
}

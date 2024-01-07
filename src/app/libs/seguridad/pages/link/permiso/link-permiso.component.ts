import { Component, Inject, OnInit } from '@angular/core';
import { IPermiso } from '../../../models/permiso.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LinkService } from '../../../services/link.service';

@Component({
  selector: 'app-link-permiso',
  templateUrl: './link-permiso.component.html',
  styleUrls: ['./link-permiso.component.scss']
})
export class LinkPermisoComponent implements OnInit {

  isProcessing = false;

  permiso_id: number = 0;

  newPermisos = new Array<IPermiso>();
  nowPermisos = new Array<IPermiso>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number = 0,
    private ownDialogRef: MatDialogRef<LinkPermisoComponent>,
    private linkService: LinkService
  ) {
    this.loadData();
  }

  ngOnInit(): void {
  }

  private loadData() {
    this.linkService.getChildrenById(this.data).subscribe({
      next: (response) => {
        this.newPermisos = response.permisos;
        this.nowPermisos = response.permisosLinks;
      },
      error: (e) => console.log(e)
    });
  }

  addPermiso(){
    this.isProcessing = true;
    this.linkService.addPermiso(this.data, this.permiso_id).subscribe(
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
    this.linkService.dltPermiso(this.data, permiso_id).subscribe(
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

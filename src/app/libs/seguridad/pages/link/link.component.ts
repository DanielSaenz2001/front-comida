import { Component, OnInit } from '@angular/core';
import { LinkService } from '../../services/link.service';
import { ILink } from '../../models/link.model';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { LinkFormComponent } from './form/link-form.component';
import { LinkPermisoComponent } from './permiso/link-permiso.component';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  links = Array<ILink>();

  displayedColumns!: Array<string>;

  constructor(
    private matDialog: MatDialog,
    private overlay: Overlay,
    private linkService: LinkService
  ) { 
    this.initialComponent();
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {

    this.linkService.index().subscribe({
      next: (response) => this.links = response,
      error: (e) => console.log(e),
    });
  }

  private initialComponent() {

    this.displayedColumns = [
      'nombre',
      'orden',
      'link',
      'icon',
      'visible',
      'actions'
    ];
  }
  
  openForm(linkId: number) {
    this.matDialog.open(LinkFormComponent, {
      width: '600px',
      panelClass: 'mat-dialog-padding',
      disableClose: true,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      data: {
        linkId: linkId,
        padre_id: null
      }
    })
    .afterClosed()
    .subscribe((answer: boolean) => {
      if (answer) {
        this.loadData();
      }
    });
  }

  
  destroy(id: any){
    this.linkService.destroy(id).subscribe({
      next: () => this.loadData(),
      error: (e) => console.log(e),
    })
  }
}

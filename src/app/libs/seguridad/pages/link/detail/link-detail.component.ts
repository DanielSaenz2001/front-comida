import { Component, OnInit } from '@angular/core';
import { ILink } from '../../../models/link.model';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { LinkService } from '../../../services/link.service';
import { ActivatedRoute } from '@angular/router';
import { LinkFormComponent } from '../form/link-form.component';
import { LinkPermisoComponent } from '../permiso/link-permiso.component';

@Component({
  selector: 'app-link-detail',
  templateUrl: './link-detail.component.html',
  styleUrls: ['./link-detail.component.scss']
})
export class LinkDetailComponent implements OnInit {

  childrens = new Array<ILink>();
  link = {} as ILink;

  linkId: string = "";

  displayedColumns!: Array<string>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private overlay: Overlay,
    private linkService: LinkService
  ) { 
    this.linkId = this.activatedRoute.snapshot.paramMap.get('linkId') as string;
    this.initialComponent();
    this.loadData();
  }

  ngOnInit(): void {
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

  private loadData() {
    this.linkService.getById(this.linkId).subscribe({
      next: (response) => {
        this.link = response.link;
        this.childrens = response.childrens;
      },
      error: (e) => console.log(e)
    });
  }
  
  destroy(id: any){
    this.linkService.destroy(id).subscribe({
      next: () => this.loadData(),
      error: (e) => console.log(e),
    })
  }
  
  openForm(linkId: number) {
    this.matDialog.open(LinkFormComponent, {
      width: '600px',
      panelClass: 'mat-dialog-padding',
      disableClose: true,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      data: {
        linkId: linkId,
        padre_id: this.linkId
      }
    })
    .afterClosed()
    .subscribe((answer: boolean) => {
      if (answer) {
        this.loadData();
      }
    });
  }
  openFormPermiso(linkId: number) {
    this.matDialog.open(LinkPermisoComponent, {
      width: '600px',
      panelClass: 'mat-dialog-padding',
      disableClose: true,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      data: linkId
    })
    .afterClosed()
    .subscribe((answer: boolean) => {
      if (answer) {
        this.loadData();
      }
    });
  }
}

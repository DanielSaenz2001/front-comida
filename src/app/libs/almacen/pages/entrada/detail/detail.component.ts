import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompraDetalleService } from '../../../services/compra-detalle.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  data = Array<any>();
  entity: any = {};

  compraId = "";

  displayedColumns!: Array<string>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private compraDetalleService: CompraDetalleService,
  ) { 
    this.compraId = this.activatedRoute.snapshot.paramMap.get('compraId') as string;
    this.initialComponent();
    this.loadData();
  }

  ngOnInit(): void {
  }

  private loadData() {
    this.compraDetalleService.index(this.compraId).subscribe({
      next: (response) => {
        this.entity = response.compra;
        this.data = response.detalle;
      },
      error: (e) => console.log(e),
    });
  }

  private initialComponent() {

    this.displayedColumns = [
      'producto',
      'unidad',
      'precio_unitario',
      'total',
    ];
  }
}

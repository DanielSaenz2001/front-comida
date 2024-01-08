import { Component, Input, OnInit } from '@angular/core';
import { IPermisoChildren } from 'src/app/libs/auth/models/permiso-children.model';
import { IPermiso } from 'src/app/libs/auth/models/permiso.model';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
  @Input() menus: IPermisoChildren[] = [];
  @Input() menus2: IPermiso[] = [];
  @Input() base = "";

  valiable_menu2 = true;
  
  constructor() { }

  ngOnInit(): void {
  }

}
